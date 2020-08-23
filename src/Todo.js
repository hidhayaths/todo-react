import React from 'react'
import { ListItem, ListItemText, Button } from '@material-ui/core'
import {DeleteForever} from '@material-ui/icons';
import './Todo.css';
import {db} from './firebase';

function Todo(props) {
    return (

            <ListItem key={props.data.key} className="todo__listItem">
                <ListItemText className="todo__listItemText" primary={props.data.title} secondary="Due:" />
                <Button className="todo__listItemButton" onClick={event=>db.collection('todos').doc(props.data.key).delete()}><DeleteForever /></Button>
            </ListItem>

    )
}

export default Todo
