import React,{Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

const styles = theme => (
    {
        card: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: 'auto',
            marginTop: 25,
            marginBottom: 25,
            marginLeft: 'auto',
            minWidth: '25%',
            maxWidth: '50%',
            backgroundColor: theme.palette.secondary.light,
        },

        author: {
            fontSize: 14,

        },

        text: {
            fontSize: 14,
            textIndent: 15,
        },
        timelabel: {
            fontSize: 12,
        },

        title: {
            fontSize: 15,
        },

        chip: {
            margin: theme.spacing.unit,
            float: 'right',

        }
    }

);

class Comment extends Component{
    state = {

    }

    render(){
        const classes = this.props.classes;
      return(
          <Card className={classes.card} >
              <div>
                  <Typography className={classes.timelabel} style={{float: 'left'}} variant='subtitle1'>{this.props.timelabel} </Typography>
                  <Chip label={this.props.author} className={classes.chip} variant="outlined" />
              </div>

              <Typography className={classes.title}
                          color='textPrimary'
                          variant='title'
              align='center'>{this.props.title}</Typography>
              <Divider variant='middle'></Divider>
              <Typography className={classes.text} color='textPrimary'  component='h1' variant='body1'>{this.props.content}</Typography>
          </Card>
      );
    }


}

export default withStyles (styles)(Comment);