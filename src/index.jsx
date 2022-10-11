import ForgeUI, { render, Fragment, Text, GlobalPage, Form, TextField, TextArea, Heading, Select, Option } from '@forge/ui';

const App = () => {
  var kudosIsSent = false;

  if (kudosIsSent) {
    return (<Text>
      The kudos to ... is sent! Send another one!
    </Text>)
  } else {
    return (
      <Fragment>
        <Fragment style="color: red;">
          <Heading size="large">
            Kudos App
          </Heading>
        </Fragment>
        <Form onSubmit={() => sendKudos()} submitButtonAppearance="primary" submitButtonText="Send kudos">
          <Heading size="medium">
            To
          </Heading>
          <Select name="to">
            <Option label="Milestone 1" value="one" />
            <Option label="Milestone 2" value="two" />
            <Option label="Milestone 3" value="three" />
          </Select>

          <Heading size="medium">
            Image
          </Heading>
          <Select name="image">
            <Option label="Milestone 1" value="one" />
            <Option label="Milestone 2" value="two" />
            <Option label="Milestone 3" value="three" />
          </Select>

          <Heading size="medium">
            Message
          </Heading>
          <TextArea name="message"></TextArea>

          <Heading size="medium">
            Sign as
          </Heading>
          <Select name="sign-as">
            <Option defaultSelected label="Anonym" value="anonym" />
            {/* todo: add the name of the employee */}
            <Option label="My identity" value="self" />
          </Select>

        </Form>
      </Fragment>
    );
  }
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);

function sendKudos() {
  // do something
  sendKudos = true;
}
