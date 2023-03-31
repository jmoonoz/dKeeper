import None "mo:base/None";
import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {
  
  //  this public type allows the JS to read into this object and know what to create
  public type Note = {
    title: Text;
    content: Text;
  };


  // new variable where all the notes will be stored as a list style
  var notes: List.List<Note> = List.nil<Note>();
  // sort of create an array of objects with that last line

  public func createNote(titleText: Text, contentText: Text){

    // create a new node
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    // new node is then added to the list of node

    // first arugment is the new node
    // second arguemnt is the list itll be added to
    notes := List.push(newNote, notes);

    Debug.print(debug_show(notes));



  }

};
