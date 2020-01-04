import React, { Component } from 'react'
import styled from 'styled-components';
import moment from 'moment-timezone';
import Text from '../components/Text';
import Notification from '../components/Notification';
import { formattedDate, addDays, subDays } from '../utils/dateFns';
import { agendaBaseUrl, API_KEY } from '../utils/constants';

const Heading = styled.div`
    padding: 16px;  
    background-color: #6b8cc6;
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


class EventListPage extends Component {
  state = {
    currentDate: new Date(),
    events: {},
    errorMessage: null,
    isLoading: false,
  }

  componentDidMount() {
    this.fetchEventDetails(this.state.currentDate);
  }

  fetchEventDetails = (date) => {
    this.setState({ isLoading: true })
    const { events } = this.state
    if (events[date]) return

    const url = `${agendaBaseUrl}/${formattedDate(date)}?key=${API_KEY}&format=json`; //store in constants
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let newEvents = data.options;
        let eventDate = moment(newEvents[0].date).tz(moment.tz.guess())
        // let eventDate = newEvents[0].date.toLocaleString('en-US', { timeZone: moment.tz.guess() })
        console.log('inside fetch date', formattedDate(eventDate))
        events[formattedDate(eventDate)] = newEvents
        this.setState({
          events: events,
          isLoading: false
        });
        return events;
      })
      .catch((error) =>
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

  renderEventItem = (event) => (
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

  renderHeader = (date) =>  (
      <Heading>
        <Text size="30px" color="white">{new Date(date).toDateString()}</Text>
        <Calendar>
          <button onClick={this.onPrevClick} style={{ width: "30px", height: "30px" }}>{'<'}</button>
          <button onClick={this.onNextClick} style={{ width: "30px", height: "30px" }}>{'>'}</button>
        </Calendar>
      </Heading>
    );

  render() {
    const { currentDate, events, errorMessage, isLoading } = this.state;
    if (errorMessage) {
      return (
        <React.Fragment>
          {this.renderHeader(currentDate)}
          <Notification>{errorMessage}</Notification>
        </React.Fragment>
      )
    }
    const formattedCurrentDate = formattedDate(currentDate);
    console.log('date', formattedCurrentDate, currentDate)
    return (
      <React.Fragment>
        {this.renderHeader(currentDate)}
        {isLoading ? <Notification>Loading...</Notification> : null}
        {
          events[formattedCurrentDate] && events[formattedCurrentDate].length ?
            events[formattedCurrentDate].map((event) => this.renderEventItem(event))
            : <Notification>We have no events for today! Please select a different date</Notification>
        }
      </React.Fragment>
    );
  }
}

export default EventListPage;
