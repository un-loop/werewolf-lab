# Polling App: Part 3

## Application Success

Great job! Professor Smith was able to get poll results for over 40 technologies!

## Requirements

The ability to add new technologies to the poll worked so well, that Professor Smith was able to add tons of new technologies to the poll!
However, she let us know that this has caused another problem. It is difficult for her to find technologies in the list. She wants to continue
using the app for the next conference, but really needs to find a solution for quickly finding technologies in the poll.

## Implementation

We think that two solutions should handle this nicely, and Professor Smith agreed. First, the technology results should be sorted. Professor Smith said that
she doesn't care about capitalization and she wants all related technologies to be shown together. So, anything starting with "J" should show together, regardless of 
case. This, then, should be a case-insensitive sort. 

We also suggested adding a filter, and she though this was a great idea. There should be a filter toggle (can be a button) that will initiate a "filter mode". While
filtering, any text entered into the input box will serve as a live filter on the technology list. The filter will show everything that starts with the entered text.  Also, all other functionality (add, delete, increment, decrement) should
still function while the filter is active. Since she doesn't care about casing, the filter should be case-insensitive as well. There should be a "clear" button that shows when the filter is active that will turn filtering off.

[Let us know](https://github.com/un-loop/PollProject/blob/master/instructions/PART4.md) when you are done.

## Notes

Frequently, when we have tables of data, we need to take certain steps in presenting that data to a user so that the data is easy to read and understand. Consider for instance, the following:

| Name      | Count |
| --------  | ----- |
| JQuery    |     5 |
| React     |     5 |
| DOM       |     8 |
| Angular   |     3 |
| NodeJs    |    12 |
| HTML5     |     2 |
| Angular 2 |     3 |

It is not immediately clear when looking at the list that Angular and Angular 2 are listed out as separate items, or that NodeJS is present and what its count is. We have to read every item in the list to determine this. Now, imagine that the list is 100's of items long! Not only are we sure to make mistakes, such a table is cumbersome to use. Two common methods of addressing the need of being able to quickly find items in a list are *sorting* and *searching*. A search typical invovles having one or more input controls to specify a search to complete, and some method of display the results of the search, usually in a table. Here, you have been asked to write a *filter*. A filter is simply a search that is performed, "in-place". That is to say, the search is applied on top of an already shown set of data that will limit the data shown.

### Sorting

At some point in frontend React code, you are making a call to the database to retrieve a list of technologies. You make some call (via axios) and retrieve a response from the server, which has a "data" property containing the deserialized data that the server sent in the body of the response. That is, axios read the JSON in the body of the response, parsed it, and turned it into javascript objects for your convenience, putting this data onto the "data" property. Since the call to the polling app's Rest API returns a JSON array of objects, axios will supply a javascript array of objects.

This is good luck. Javascript has supplied a [sort method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) on the Array prototype that is exactly what we need. Take a moment to look at the documentation. When you are ready, come back for some discussion about `sort()`.

From the documentation, we can see a couple of items of interest. Firstly, sort() performs an in-place sorting of the array. Let's look at the following example:
```
var numArr = [3,1,2];
numArr.sort();
console.log(numArr);
```
When we run this code, we will see the value `[1, 2, 3]` logged to the console. What this tells us is that numArr was changed due to the call to `sort()`. In addition, `sort()` will return the array, so that the sort method can conveniently be used in an expression. To continue the example:

```
var numArr = [3,1,2];
console.log(numArr.sort());
```

will cause `[1, 2, 3]` to be logged to the console, and numArr will be sorted at the end of execution.

The second interesting item is how the sort is performed. The sort method expects to be given a compare function. A compare function is a simple function `function compare(a,b) { // some code }` that will return whether "a" is less than, greater than, or equal to "b". It is only by using this compare function that `sort()` is able to place the items in the array in order.  "But," you object, "I don't have to give `sort()` a compare function! It works fine without one!" That is half true. You do not have to give a compare function to `sort()`, but that doesn't mean it doesn't have one. If a compare function is not supplied, `sort()` will use a default function.

`sort()` is defined on the array prototype and is written in the most generic way possible to be useful to all kinds of arrays. When invoked, `sort()` will run [one of](https://stackoverflow.com/questions/234683/javascript-array-sort-implementation) a list of [well-known](https://www.geeksforgeeks.org/sorting-algorithms/) sorting algorithms, calling the compare function whenever in the course of the algorithm `sort()` needs to determine whether one item in a list falls before another. This technique, that of passing to a generic algorithm a specific implementation detail is a popular technique in programming, called [dependency injection](https://medium.freecodecamp.org/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f). If you read about dependency injection, you will find that most of the literature speaks about the technique in terms of classes. Don't fret, the same principle holds for functions as well. In short, we abstract out a detail (determining which of two items comes first) and pass that in to a generic method.

In this manner, `sort()` can handle all sorts of arrays: arrays of numbers, of strings, or of objects. Since this is Javascript, I can even have an array of mixed types, as in `let mixedArr = [3, "2", {one: true}]`. It is during the invocation of `sort()`, which is located in the code of a specific application such as your polling app, that we specify how we want to perform the particular comparison. However, the developers who originally wrote the `sort()` function recognized that it would be a real pain if every time you called `sort()` you had to tell how to compare the array being sorted. They also recognized that it would be impossible to know beforehand how to compare items from every type. After all, the array may contain some very special objects that only the end developer knows how to compare or the comparison may even be dependent on your program state. So, they struck a compromise. They developed a compare function that was "good enough" and that would handle the most cases. This compare function is used as the default compare function, when one is not specified.

The compromise default compare function they arrived at is this: Take the two items in the array being compared and turn them into strings, with 1 becomming "1", objects becomming "[Object]" and arrays becomming "[Array(*n*)]". Now, take those strings and return which is greater, as a string. That means "11" comes before "5", since comparing strings is done one character at a time (the first character of "11", "1", comes before "5"). Likewise, "[Object]" comes before "a" because "\[" comes before "a". It's not perfect, but the decision is defensible. One must choose *some* algorithm. 

In our case, we are comparing technology objects that have a name and a count. The default compare function is not sufficient for us. Each of our objects will be converted to "[Object]" and the compare will show each as being identical. The upshot of this is that our sorting will be essentially unpredictable (this is not quite true, but since we do not know the particulars of the sorting algorithm being used it might as well be). So, we want to write a compare function that will return whether the first technology's name is less than, equal to, or greater than, the second technology's name (by returning -1, 0, or 1). [The documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for `sort()` has great examples of performing sorts on objects. Remember, your sort needs to be caase in-sensitive. Think about how you can massage your input so that you can compare the names without respect to their case.

Once you have a compare function defined you can call the sort function:

```
const compare = function(a,b) {
  //my code
}

response.data.sort(compare);
```

Your compare function can be defined anywhere a function is defined (in your module globally, on your React component, as a local variable, or inline). Where you put it is a matter of style, though you do need to be certain it is in scope for wherever you wish to invoke `sort()`. Since this compare function only need be referenced in one place, I recommend defining it as a local variable, or inline. I often prefer to not define such functions inline so that my code is more easily read, but many developers will put it inline.

### Filtering

As previously mentioned, *filtering* is *searching* in-place on an existing data set. The idea of a filter conjures the following image:

Data Source --> selection screen --> Output data

The key takeaways here are:
- Every item in the output was present in the data source
- Every item in the output matches a list of criteria in the "screen" or "filter"
- Zero or more items may be missing in the output (or "filtered")

Just like `sort()` there is a convenient method on the Array prototype to do this: [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). `filter()` takes a callback which is to "test" whether or not an item in the data source "passes" the filter. The documentation has excellent examples how to craft this callback. One such example would be by passing an arrow function as a callback:

```
myData.filter( (item) => item.value >= this.state.minValue);
```

This particular example might be used in a react component, where we have a minValue property on the component state. This minValue property is then used in a filter to select only the items in myData that are greater than minValue. Your excercise is to filter your technology list to only show items that start with the text that is currently entered in an input box.

In the end, you will chain this together with your sort to have something like:

```
const compare = function(a,b) {
  //my code
}

const filter = function(item) {
 //my code
 }
 
const data = response.data.filter(filter).sort(compare);
```

Be aware that `filter()`, unlike `sort()` will return a new array, leaving the original array unchanged.

### Views

A view on a set of data is a series of operations that transform that set into a desired form for easy manipulation or consumption. That is a mouthful. Let's break that down. 

*A view ... is a series of operations*

What kind of operations? Well, we've already seen a couple. Sorting is one. Filtering is another. Both of these operations transform our data into a desired form (listed in alphabetical order, starting with the letter "J", etc). Another common operation used in a view, and the last we will introduce here is "projection". A projection is an operation that takes sequential objects from a list, converts each separately to a new value, and creates a new list. You have likely used projections throughout your javascript code without realizing it. [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on the Array prototype will perform a projection. `map()` takes a callback which instructs map how to create a new element from the existing one.

```
const walls = [{width: 4}, {width: 6}, {width: 8}];
const projection = walls.map( (wall) => new {width: `${wall.width} inches`};
```

The above is a projection which takes an array of walls and "projects" each item into a more consumable format. In this case, we are projecting our items into a form ready for display. In the polling app, we do not forsee a need to use a projection on your data, we are simply illustrating the concept for the sake of completeness.

You may wish to introduce the concept of a view in your polling app to encapsulate your data manipulation. Is such encapsulation necessary? No. Is it helpful? Maybe. Most developers would not encapsulate the calls to `filter()` and `sort()` here. Personally, whenever I have three or more related concerns, I will encapsulate. If I have one, I do not. If I have two, it depends on their complexity. In this case, I like moving this into a separate method because it also move all references to our component state and/or props that we will need to reference for the filter.

```
function getView(data) {
    //define my filter and compare functions, may reference this.state, this.props

    return data.filter(filter).sort(compare);
}

//later
const data = this.getView(response.data);
```

Furthermore, once we make this leap to encapsulate this functionality, we open up or code for future extension, say, creating a [HOC](https://reactjs.org/docs/higher-order-components.html) that takes in a function as a parameter that will create a view. If you don't understand HOCs, don't worry. This is just to say that whenever we encapsulate a bit of functionality, we open up an opportunity to abstract it later.


