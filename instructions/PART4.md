# Polling App: Part 4

## Application Success

Great job! Professor Smith has been getting great poll results from the app.

## Requirements

Professor Smith has been getting great results, but has noticed a few concerns. Firstly, she accidentally deleted a technology and lost her results! 
Secondly, she mistakenly added a technology twice and has since been having some difficulty using the app.

## Implementation

We agree that this is a problem. We need to be sure to do some validation on our operations. We think that we should give a warning message that an item we want to delete has poll results. 
We can show this in a modal and have Professor Smith confirm that she wants to delete the item. You can use a [component](https://github.com/reactjs/react-modal) to do this, or use a framework 
like [bootsrap](https://getbootstrap.com/) or [material-ui](https://material-ui.com/) that supports modals. Also, we should check whether a technology
already exists before allowing one to be added. If it exists, we should display a message. This message, we think, can be inline and shown in red below the input box.

**bonus styling**: use [css transitions](https://www.w3schools.com/css/css3_transitions.asp) to "slide" the error message in isntead of using a modal. Have the error message component have a background and border
so that is stands out from the remainder of the app. Add an icon or "x" to allow the message to be dismissed.

[Let us know](https://github.com/un-loop/PollProject/blob/master/instructions/PART5.md) when you are done.
