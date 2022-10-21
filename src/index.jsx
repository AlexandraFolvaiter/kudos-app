import ForgeUI, { useState, render, Fragment, Text, GlobalPage, Form, TextField, Image, Heading, Select, Option, UserPicker, Table, Row, Cell, Button, ButtonSet, TextArea } from '@forge/ui';
import { fetch } from '@forge/api';
import api, { route } from "@forge/api";

const App = () => {
  const [formState, setFormState] = useState(undefined);
  const [stage, setStage] = useState(0);
  const [userDetails, setUserDetails] = useState(undefined);

  const onSubmit = async (formData) => {
    setFormState(formData);
    setStage(1);

    const userDetailsResponse = await api.asApp().requestConfluence(route`/wiki/rest/api/user?accountId=${formData.user}`, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json());

    setUserDetails(userDetailsResponse)
  };

  const sendKudos = async () => {

    var toEmail = userDetails?.email;
    var fromEmail = "EMAIL";
    var subject = "A colleague has something to say to you! Kudos!"
    var body = `Hi ${userDetails.displayName},

    <p>
    A colleague has something to say to you! 
    </p>
    <h2>${formState.message}</h2>
    
    <img width=\\"400px\\" src=\\"${formState.image}\\" />

    <br/><br/>
    
    Sent from KudosApp.
    `;

    await fetch(
      "LINK_TO_SERVICE",
      {
        method: "POST",
        body: `
        {
          "to": "${toEmail}",
          "from": "${fromEmail}",
          "server": "SERVER",
          "port": ppp,
          "username": "USERNAME",
          "password": "PASSWORD",
          "subject": "${subject}",
          "body": "${body}"
        }`
      }
    );

    setStage(2);
  }

  const goToFirstStep = (resetForm = false) => {
    setStage(0);
    if (resetForm == true) {
      setFormState(undefined);
    }
  }

  return (
    <Fragment>
      <Heading size="large">
        Kudos App
      </Heading>
      <Table>
        <Row>
          <Cell>

          </Cell>
          <Cell >

            {stage == 0 &&
              <Fragment>
                <Heading size="medium">
                  Add details
                </Heading>
                <Form onSubmit={async (args) => await onSubmit(args)} submitButtonAppearance="primary" submitButtonText="Preview & Send kudos">

                  <UserPicker label="User" name="user" isRequired="true" includeUsers="true" defaultValue={formState?.user ?? ''} />

                  <Select label="Image" name="image" isRequired="true" defaultValue={formState?.image ?? ''}>
                    <Option label="Congrats 1" value="https://i.im.ge/2022/10/17/2hql4K.1.png" />
                    <Option label="Congrats 2" value="https://i.im.ge/2022/10/17/2hqTTz.2.png" />
                    <Option label="Congrats 3" value="https://i.im.ge/2022/10/17/2hqus9.3.png" />
                    <Option label="Happy Birthday 1" value="https://i.im.ge/2022/10/17/2hqSmM.4.png" />
                    <Option label="Happy Birthday 2" value="https://i.im.ge/2022/10/17/2hqdWY.5.png" />
                    <Option label="Encouragement" value="https://i.im.ge/2022/10/17/2hqaU4.6.png" />
                    <Option label="I am grateful" value="https://i.im.ge/2022/10/17/2hq7YC.7.png" />
                  </Select>

                  <TextArea label="Message" name="message" defaultValue={formState?.message ?? ''} isRequired="true" />

                </Form>
              </Fragment>
            }

            {
              stage == 1 && <Fragment>
                <Heading size="medium">
                  Preview
                </Heading>
                <Heading>
                  Send to: {userDetails?.displayName}
                </Heading>

                <Heading>
                  {formState.message}
                </Heading>

                <Image
                  src={formState.image}
                  alt="Image"
                  size="xlarge"
                />


                <Fragment>
                  <ButtonSet>
                    <Button text="Back" onClick={() => goToFirstStep()} appearance="subtle" />
                    <Button text="Send kudos" onClick={() => sendKudos()} appearance="primary" />
                  </ButtonSet>
                </Fragment>

              </Fragment>
            }

            {stage == 2 &&
              <Fragment>

                <Heading>
                  Congrats! You sent a kudos!
                </Heading>
                <Image
                  src="https://i.im.ge/2022/10/21/2NuZv4.Green-and-White-Modern-Congrats-On-a-Great-Job-Card.gif"
                  alt="congrats-image"
                  size="xlarge" />


                <Button text="Start over" onClick={() => goToFirstStep(true)} appearance="primary" />
              </Fragment>
            }

          </Cell>
          <Cell>
          </Cell>
        </Row>
      </Table>

    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);