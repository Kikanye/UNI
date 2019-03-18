import React from 'react';
import {Modal,Form} from "semantic-ui-react";
import '../../App.css'
import {DateTimeInput} from 'semantic-ui-calendar-react';
import axios from "../../axios_def";
//TODO SHow that message that activity has been created take them  to that page immediately
//TODO reload activities

const Categories = [
    {
        key: 'SPORTS',
        text: 'SPORTS',
        value: 'SPORTS',
    },
    {
        key: 'STUDY',
        text: 'STUDY',
        value: 'STUDY',

    }
];
const numberOfPeople = [
    {
        key: '1',
        text: '1',
        value: '1',
    },
    {
        key: '2',
        text: '2',
        value: '2',
    },
    {
        key: '3',
        text: '3',
        value: '3',
    }
    ]

;

class CreateActivity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            attendance_list:[],
            activity_dateTime: '',
            max_attendance:'',
            category:'',
            title:'',
            description:'',
            location:'',
            formError:false,
            titleError:false,
            categoryError:false,
            descriptionError:false,
            max_attendanceError:false,
            locationError:false,
            activity_dateTimeError: false,
            show:false

        };



    }

    open = () => this.setState({ show: true });

    submitNewActivity (){
        console.log("change");
        const token = this.props.token;
        console.log(token);
        let helper= {
            headers: {"Authorization": ''+token,
                "Content-Type": "application/json"}
        };
        const userInfo = {
            attendance_list:"[]",
            category:this.state.category,
            activity_datetime: this.state.activity_dateTime,
            max_attendance:this.state.max_attendance,
            description: this.state.description,
            title: this.state.title,
            location: this.state.location
        };
        axios.post('http://ec2-99-79-39-110.ca-central-1.compute.amazonaws.com:8000/activities/activity/create', userInfo,helper).then( (res) => {
        }).catch(error => {
            console.log(error.response)
        });
    }
    submitForm() {

        let error = false;
        console.log(this.state.show);
        if (this.state.title === '') {
            this.setState({titleError: true});
            error = true
        }
        else {
            this.setState({titleError: false});
            error = false
        }
        if (this.state.description === '') {
            this.setState({descriptionError: true});
            error = true
        }
        else {
            this.setState({descriptionError: false});
            error = false
        }
        if (this.state.category === '') {
            this.setState({categoryError: true});
            error = true
        }
        else {
            this.setState({categoryError: false});
            error = false
        }
        if (this.state.location === '') {
            this.setState({locationError: true});
            error = true
        }
        else {
            this.setState({locationError: false});
            error = false
        }
        if (this.state.max_attendance === '') {
            this.setState({max_attendanceError: true});
            error = true
        }
        else {
            this.setState({max_attendanceError: false});
            error = false
        }
        if (this.state.activity_dateTime === '') {
            this.setState({activity_dateTimeError: true});
            error = true
        }
        else {
            this.setState({titleError: false});
            error = false
        }
        if (error) {
            this.setState({formError: true});
        }
        else {
            this.submitNewActivity();
            this.submitCloseModal()
        }


    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };
    submitCloseModal = () => {
        if(this.state.formError === false){
            this.setState({show: false})
        }


    };
    closeModal = () => {
        this.setState({show: false})

    };

    render() {
        return (

            <Modal closeIcon  onClose ={this.closeModal} open = {this.state.show} size='large' id='createActivityModal' >
                <Modal.Header>Create An Activity</Modal.Header>
                <Form disabled={false}>
                    <Form.Field>
                        <label>Category</label>
                        <Form.Dropdown
                            required
                            name="category"
                            placeholder='Category'
                            fluid
                            selection
                            options={Categories}
                            onChange={this.handleChange}
                            error={this.state.categoryError}
                            value={this.state.category}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Name of activity</label>
                        <Form.Input placeholder='Name of activity'
                                    name="title"
                                    required
                                    error={this.state.titleError}
                                    onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Location</label>
                        <Form.Input placeholder='Location'
                                    name="location"
                                    error={this.state.locationError}
                                    onChange={this.handleChange}
                                    required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.TextArea placeholder='Description'
                                       name="description"
                                       onChange={this.handleChange}
                                       error={this.state.descriptionError}
                                       required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Number of attendees needed </label>
                        <Form.Dropdown
                            placeholder='Number of attendees needed '
                            fluid
                            search
                            selection
                            required
                            options={numberOfPeople}
                            error={this.state.max_attendanceError}
                            name="max_attendance"
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Data and Time</label>
                        <DateTimeInput
                            name="activity_dateTime"
                            placeholder="Date Time"
                            required
                            // minDate={}
                            dateTimeFormat={'YYYY-MM-DD, h:mm:ss'}
                            error={this.state.activity_dateTimeError}
                            value={this.state.activity_dateTime}
                            iconPosition="left"
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Button
                        onClick={this.submitForm.bind(this)}>
                            Create
                        </Form.Button>
                    </Form.Field>
                </Form>

            </Modal>


        );
    }
}
export default CreateActivity;