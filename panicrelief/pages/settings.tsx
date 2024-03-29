import React, { useState, useEffect } from 'react';
import { Spacer, Spinner } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { Flex, Text, Button, Separator, TextField, Grid} from '@radix-ui/themes';

const main_content = {
  paddingTop: '5rem',
  paddingRight: '5rem',
  paddingLeft: '5rem',
};

const configNameMap: { [key: string]: string } = {
  email: 'Email',
  password: 'Password',
  server_host: 'Server Host',
  server_port: 'Server Port',
  emailRecipients: 'Email Recipients',
  smsRecipients: 'SMS Recipients',
  twilio_account_sid: 'Twilio Account SID',
  twilio_auth_token: 'Twilio Auth Token',
};

const tooltipMap = {
  email: 'Your email address',
  password: 'Your email password',
  server_host: 'Your email server host (default: outlook.office365.com)',
  server_port: 'Your email server port (default: 993)',
  emailRecipients: 'Comma separated emails to send alerts to',
  smsRecipients: 'Comma separated phone numbers to send alerts to',
  twilio_account_sid: 'Your Twilio account SID',
  twilio_auth_token: 'Your Twilio auth token',
};

type response = {
  key: string;
  value: string;
};

const SettingsForm = () => {

  type data = {
    email: string;
    password: string;
    server_host: string;
    server_port: number;
    emailRecipients: string;
    smsRecipients: string;
    twilio_account_sid: string;
    twilio_auth_token: string;
  };

  const left = {
    email: 'email',
    password: 'password',
    server_host: 'server_host',
    server_port: 'server_port',
  }

  const right = {
    emailRecipients: 'emailRecipients',
    smsRecipients: 'smsRecipients',
    twilio_account_sid: 'twilio_account_sid',
    twilio_auth_token: 'twilio_auth_token',
  }

  const [configData, setConfigData] = useState({
    email: '',
    password: '',
    server_host: 'smtp-mail.outlook.com',
    server_port: 587,
    emailRecipients: '',
    smsRecipients: '',
    twilio_account_sid: '',
    twilio_auth_token: '',
  } as data);

  useEffect(() => {
    console.log('Getting settings');
    fetch('/api/settings')
      .then((response) => response.json())
      .then((settings) => {
        setConfigData(settings);
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
      });
  }, []);
  

  const handleSubmit = (event: any) => {
    event.preventDefault();
    Object.entries(configData).forEach(([key, value]) => {
      fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      })
      .then(response => response.json())
      .then(data => {
        toast.success(data.message, { autoClose: 1000 });
      })
      .catch(error => {
        console.error('Error updating settings:', error);
      });
    });
  };
  

  const handleChange = (event: any) => {
    event.preventDefault();
    setConfigData({ ...configData, [event.target.name]: event.target.value });
  };  

  return (
    <React.Fragment>
      <div>
        <Flex justify="end" style={{paddingRight: '5rem', paddingTop: '1rem'}}>
          <Button onClick={() => window.location.href = '/'} size="1" variant="soft" style={{cursor: 'pointer'}}>Back</Button>
        </Flex>
      </div>
      <div style={main_content}>
      <Text size="3" weight="bold">Settings</Text>
      <Spacer y={2} />
      <Text size="2" color="gray">Manage your account settings and set e-mail preferences.</Text>
      <Spacer y={2} />
      <Separator my="3" size="4" />
      <Grid columns="2" gap="3" width="auto">
      <div>
        <form style={{ maxWidth: 400 }}>
        {Object.keys(left).map(key => (
            <div key={key}>
                {/* If the key is not emailRecipients */}
                {key !== 'emailRecipients' && key !== 'twilio_account_sid' && key !== 'twilio_auth_token' && (
                  <>
                    <Text size="2" weight="bold">{configNameMap[key]}</Text>
                    <Spacer y={1} />
                    <TextField.Input
                        style={{ backgroundColor: 'transparent' }}
                        type={key === 'password' ? 'password' : 'text'}
                        name={key}
                        value={configData[key as keyof data]}
                        placeholder={configNameMap[key]}
                        onChange={handleChange}
                    />
                    <Spacer y={1} />
                    <Text size="1" color="gray">{tooltipMap[key as keyof data]}</Text>
                    <Spacer y={2} />
                  </>
                )}
            </div>
            ))}
        </form>
      
        <Button color='teal' onClick={handleSubmit}>Save</Button>

        </div>

        <div>
          {Object.keys(right).map(key => (
            <div key={key}>
              <Text size="2" weight="bold">{configNameMap[key]}</Text>
              <Spacer y={1} />
              <TextField.Input
                style={{ backgroundColor: 'transparent' }}
                type='text'
                name={key}
                value={configData[key as keyof data]}
                placeholder={configNameMap[key]}
                onChange={handleChange}
              />
              <Spacer y={1} />
              <Text size="1" color="gray">{tooltipMap[key as keyof data]}</Text>
              <Spacer y={2} />
            </div>
          ))}
        </div>
      </Grid>
      </div>
    </React.Fragment>
  );
};

export default SettingsForm;
