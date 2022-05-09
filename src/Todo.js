import { useState, useEffect, Fragment } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

export default function Todo(props){
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let date=new Date().toLocaleDateString();

  let [archive, setarchive] = useState([]);
    let [items, setitems] = useState([{
        title:'reading book',
        description:'reading 10 pages every day for month',
        checked:0,
        createdAt:'5/8/2022',
        finishedAt:'',
        archiveAt:''
    },{
        title:'writing book',
        description:'writing 10 pages every day for month',
        checked:1,
        createdAt:'5/8/2022',
        finishedAt:date,
        archiveAt:''
    }]);
    let [title, settitle] = useState('');
    let [desc, setdesc] = useState('');
    function create(){
        items.push({
            title:title,
        description:desc,
        checked:0,
        createdAt:date,
        finishedAt:'',
        archiveAt:''
        });
        setitems([...items]);
    }

      
    return(
        <Container maxWidth="lg" sx={{height:'100vh'}}>
            <Box
             pt={5}
             pb={5}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40%' },
                    display:'flex',justifyContent:'center'
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField
                        id="outlined-name"
                        label="Title"
                        onChange={e=>settitle(e.target.value)}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Description"
                        onChange={e=>setdesc(e.target.value)}

                    />
                    <Button sx={{padding:'13px',width:'20% !important'}} onClick={create} size="large" variant="contained">Create</Button>
            </Box>
            <Container maxWidth="md" sx={{justifyContent:'center', display:'flex'}}>
                 <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {items.map((item,index) => (
                        
                     <ListItem
                        key={item}
                        disableGutters
                        secondaryAction={
                            <Fragment>
                                <IconButton aria-label="delete">
                                <DeleteIcon sx={{ color: red[500] }} onClick={()=>{items.splice(index,1);
                                setitems([...items])}}/>
                                </IconButton>
                                <IconButton aria-label="archive">
                                    <ArchiveIcon color="secondary" onClick={()=>{archive.push(item);setarchive([...archive]);
                                    items.splice(index,1);
                                    setitems([...items]);items[index].archiveAt=date; setitems([...items]) }}/>
                                </IconButton>  
                                <IconButton aria-label="edit">
                                    <EditIcon color="success" onClick={()=>document.getElementsByClassName('hide-form')[index].style.display='flex'}/>
                                </IconButton>   
                                <IconButton aria-label="view">
                                    <PreviewIcon color="primary" onClick={handleClickOpen}/>
                                </IconButton> 
                              
                            </Fragment>
                        }
                        >
                        <ListItemIcon>
                            <Checkbox
                            checked={item.checked==1 ? true :false}
                            inputProps={'aria-labelledby'}
                            onChange={e=>{e.target.checked==true? items[index].checked=1:items[index].checked=0; 
                                setitems([...items]); e.target.checked==true?items[index].finishedAt=date:items[index].finishedAt='';setitems([...items])}}
                            />
                        </ListItemIcon>
                        <ListItemText primary={` ${item.title}`} />
                    
                        <Box
                            className="hide-form"
                            pt={5}
                            mt={5}
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '40%' },
                                    display:'none',justifyContent:'center',marginTop:'70px'
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                    <TextField
                                        id="outlined-name"
                                        label="Title"
                                        value={item.title}
                                        onChange={e=>{ items[index].title=e.target.value;setitems([...items])}}
                                    />
                                    <TextField
                                        id="outlined-name"
                                        label="Description"
                                        value={item.description}
                                        onChange={e=>{ items[index].description=e.target.value;setitems([...items])}}

                                    />
                                    <Button sx={{padding:'5px',width:'15% !important'}} color="success"
                                           onClick={()=>document.getElementsByClassName('hide-form')[index].style.display='none'} size="large" variant="contained">Edit</Button>
                        </Box>
                        <Dialog onClose={handleClose} open={open}>
                                    <DialogTitle>Title: {items.title}</DialogTitle>
                                    <DialogContent dividers>
                                    <Typography gutterBottom>
                                        Description: {item.description}
                                    </Typography>
                                    <Typography gutterBottom>
                                        Created: {item.createdAt}
                                    </Typography>
                                    <Typography gutterBottom>
                                        Finished: {item.finishedAt!=''?item.finishedAt:' not finished yet'}
                                    </Typography>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        close
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                    </ListItem>
                    
                    ))}
                </List>
            </Container>
        </Container>
    )

}

