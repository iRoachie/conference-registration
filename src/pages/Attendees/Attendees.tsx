import React from 'react';
import { Wrapper, Loading, Section, EmptyData } from 'components';
import { firebase } from 'config';
import { Attendee, Category } from 'utils';
import styled from '@styled';
import {
  Form,
  Input,
  Icon,
  Button,
  message,
  Select,
  List,
  Card,
  Badge,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

interface State {
  fetching: boolean;
  loading: boolean;
  search: string;
  categories: Category[];
  filteredAttendees: Attendee[];
  attendees: Attendee[];
}

interface Params {
  eventId: string;
}

type Props = FormComponentProps & RouteComponentProps<Params>;

class Attendees extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fetching: true,
      loading: false,
      categories: [],
      filteredAttendees: [],
      attendees: [],
      search: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const { eventId } = this.props.match.params;

      const [a, b] = await Promise.all([
        firebase
          .firestore()
          .collection('events')
          .doc(eventId)
          .collection('categories')
          .get(),
        firebase
          .firestore()
          .collection('events')
          .doc(eventId)
          .collection('attendees')
          .get(),
      ]);

      const categories = a.docs.map(
        a =>
          ({
            id: a.id,
            ...a.data(),
          } as Category)
      );

      const attendees = b.docs.map(
        a =>
          ({
            id: a.id,
            ...a.data(),
          } as Attendee)
      );

      this.setState({
        categories,
        attendees,
        filteredAttendees: attendees,
        fetching: false,
      });
    } catch (error) {
      this.setState({ fetching: false });
      console.error(error);
    }
  };

  submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { categories } = this.state;

    this.props.form!.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true }, () =>
          this.createAttendee(
            values.name,
            categories.find(a => a.id === values.category)!
          )
        );
      }
    });
  };

  createAttendee = async (name: string, category: Category) => {
    try {
      const { attendees } = this.state;
      const { eventId } = this.props.match.params;

      if (
        attendees &&
        attendees.find(a => a.name.toLowerCase() === name.toLowerCase())
      ) {
        message.error('Attendee already added');
        this.setState({ loading: false });
        return;
      }

      const attendee = {
        name,
        category,
        present: false,
      };

      await firebase
        .firestore()
        .collection('events')
        .doc(eventId)
        .collection('attendees')
        .add(attendee);

      this.props.form.setFields({ name: '' });

      await this.getData();

      this.setState({ loading: false });

      message.success(`Attendee "${name}" in "${category.name}" added.`, 3);
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  updateSearch = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const input = value.trim();

    this.setState(({ attendees, search }) => ({
      search: value,
      filteredAttendees:
        input === ''
          ? attendees
          : attendees.filter(a =>
              a.name.toLowerCase().includes(value.toLowerCase())
            ),
    }));
  };

  render() {
    const {
      loading,
      fetching,
      categories,
      filteredAttendees,
      attendees,
      search,
    } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (fetching) {
      return <Loading />;
    }

    return (
      <Container>
        <Wrapper>
          <Section
            title="New Attendee"
            description="Add a new attendee for this event."
          >
            <Form onSubmit={this.submitHandler}>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input attendee name!',
                    },
                  ],
                })(
                  <Input
                    type="text"
                    disabled={loading}
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Attendee Name"
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('category', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select a category',
                    },
                  ],
                })(
                  <Select disabled={loading} placeholder="Category">
                    {categories.map(a => (
                      <Select.Option value={a.id} key={a.id}>
                        {a.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Button htmlType="submit" type="primary" loading={loading}>
                Add Attendee
              </Button>
            </Form>
          </Section>

          <Section
            title={
              <h3>
                Attendees <Badge count={attendees.length} />
              </h3>
            }
            description="List of all attendees invited to this event."
          >
            {attendees.length === 0 ? (
              <EmptyData
                title="No Attendees Added as Yet"
                description="Fortunately, it’s very easy to create one."
              />
            ) : (
              <Card>
                <Search
                  placeholder="Search attendees"
                  prefix={
                    <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  value={search}
                  onChange={this.updateSearch}
                />

                <AttendeesList>
                  <List
                    dataSource={filteredAttendees}
                    renderItem={(a: Attendee) => (
                      <List.Item>
                        <List.Item.Meta
                          title={a.name}
                          description={a.category.name}
                        />
                      </List.Item>
                    )}
                  />
                </AttendeesList>
              </Card>
            )}
          </Section>
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.div`
  margin-top: 30px;
`;

// @ts-ignore
const Search = styled(Input)`
  margin-bottom: 20px;
`;

const AttendeesList = styled.div`
  border-top: ${({ theme }) => theme.border};
  padding-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
`;

export default Form.create()(Attendees);
