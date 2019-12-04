import React, { Component } from 'react'
import styled from 'styled-components';
import Text from '../components/Text';
import { formattedDate, addDays, subDays } from '../utils/dateFns';

const Heading = styled.div`
    padding: 16px;  
    background-color: deepskyblue;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Calendar = styled.div`
    padding: 16px;  
`;

const RowItem = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
`;
const EventDetails = styled.div`
    padding: 16px;
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: flex-start;
`;
const Timings = styled.div`
    padding: 16px;
    display: flex;
    flex:1;
`;
const Notification = styled.div`
    padding:16px;
    color: red
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

class EventListPage extends Component {
  state = {
    currentDate: new Date(),
    events: [],
    errorMessage: null,
    isLoading: false,
  }

  static getDerivedStateFromProps() {
    // add all api data to eventList if not added
  }

  componentDidMount() {
    this.fetchEventDetails(this.state.currentDate);
  }

  fetchEventDetails = (date) => {
    this.setState({ isLoading: true })

    const url = `https://www.rijksmuseum.nl/api/en/agenda/${formattedDate(date)}?key=yW6uq3BV&format=json`; //store in constants
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let events = data.options;
        this.setState({
           events: events,
           isLoading: false  
        });
        return events;
      })
      .catch((error) =>
        // console.log(error, typeof(error))
        this.setState({ 
          errorMessage: error.toString(),
          isLoading: false 
         })
      );
  }

  onNextClick = () => {
    const { currentDate } = this.state;
    const nextDate = addDays(currentDate, 1);
    this.setState({ currentDate: nextDate });
    this.fetchEventDetails(nextDate);
  }

  onPrevClick = () => {
    const { currentDate } = this.state;
    const prevDate = subDays(currentDate, 1);
    this.setState({ currentDate: prevDate });
    this.fetchEventDetails(prevDate);
  }

  renderEventItem = (event) => {
    console.log({ event });
    return (
      <React.Fragment>
        <RowItem>
          <Timings>
            <Text size="20px" weight="700">{event.period.text}</Text>
          </Timings>
          <EventDetails>
            <Text size="20px" weight="700">{event.exposition.name}</Text>
            <Text size="14px" color="grey">Language:  {event.lang === 'en' ? 'English' : 'Dutch'}</Text>
            <Text size="14px" color="grey">Places available: {event.period.current} of {event.period.maximum}</Text>
            <Text size="14px" color="grey">Appropriate for: {event.expositionType.friendlyName}</Text>
          </EventDetails>
        </RowItem>
        <hr />
      </React.Fragment>
    );
  }

  renderHeader = (date) => {
    return (
      <Heading>
        <Text size="30px" color="white">{new Date(date).toDateString()}</Text>
        <Calendar>
          <button onClick={this.onPrevClick} style={{ width: "30px", height: "30px" }}>{'<'}</button>
          <button onClick={this.onNextClick} style={{ width: "30px", height: "30px" }}>{'>'}</button>
        </Calendar>
      </Heading>
    );
  }

  render() {
    const { currentDate, events, errorMessage, isLoading } = this.state;
    console.log({ events, errorMessage, isLoading });

    if (errorMessage) {
      return (
      <React.Fragment>
        {this.renderHeader(currentDate)}
        <Notification>{errorMessage}</Notification>
      </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {isLoading ? <Notification>Loading...</Notification> : null}
        {
          events.length ?
            events.map((event) => this.renderEventItem(event))
            : <Notification>We have no events for today! Please select a different date</Notification>
        }
      </React.Fragment>
    );
  }
}

export default EventListPage;
