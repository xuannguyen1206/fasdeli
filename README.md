# DRAG-DROP + UNDO/REDO
## Usage
Clone the repo  
Install dependencies
```bash
 npm install 
```
Start localhost
```bash 
npm run dev
```
## Features
### Drag-drop
- Use synthetic event
- As user drop elements, they are created in an objects called ```customerDisplay```
- This object when click ```save``` button will store in localStorage. If the ```save```  button is not hit, ```view``` is unclickable 
- Customer page will use localStorage version to initialize the page.
### Undo-Redo
- Create a custom hook to keep track of the ```customerDisplay```.
- The hook stores every object's modifications in an array and then move up according to the command (undo and redo ) 