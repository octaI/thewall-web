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
            marginTop: 25,
            marginBottom: 25,
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
              {/*<Typography className={classes.author} variant='subtitle1' color='textPrimary' align='right'*/}
              {/*> {this.props.author} </Typography>*/}
              <div>
                  <Chip label={this.props.author} className={classes.chip} variant="outlined" />
              </div>

              <Typography className={classes.title}
                          color='textPrimary'
                          variant='h6'
              align='center'>{this.props.title}</Typography>
              <Divider variant='middle'></Divider>
              <Typography className={classes.text} color='textPrimary'  component='h1' variant='body1'>{this.props.content}</Typography>
          </Card>
      );
    }


}

export default withStyles (styles)(Comment);