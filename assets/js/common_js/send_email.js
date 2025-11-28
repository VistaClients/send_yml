async function fetch_token() {
  try {
    const response = await fetch('send_email_token.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.first_token + data.second_token;

  } catch (error) {
    console.error("Failed to fetch token:", error);
    return null;
  }
}

window.sendEmailDataToGitHub = async function(emailSubject, emailBody) {
  const token = await fetch_token();

  if (!token) {
    console.error("Token missing or failed to load.");
    return;
  }

  const response = await fetch('https://api.github.com/repos/VistaClients/send_yml/dispatches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      event_type: 'send_email',
      client_payload: {
        subject: "Test Subject",
        to_email: 'fashionsense482@gmail.com',
        body: "This is the body of the email."
      }
    })
  });

  if (response.ok) {
    console.log('GitHub Actions triggered successfully');
  } else {
    console.error('Error triggering GitHub Actions');
  }
};
