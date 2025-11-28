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

window.sendEmailDataToGitHub = async function() {
  const name = document.querySelector('[name="name"]').value.trim();
  const email = document.querySelector('[name="email"]').value.trim();
  const message = document.querySelector('[name="message"]').value.trim();

  // Validate
  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }
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
        subject: "Contact Enquiry ",
        to_email: email,
        body: message
      }
    })
  });

  if (response.ok) {
    console.log('GitHub Actions triggered successfully');
  } else {
    console.error('Error triggering GitHub Actions');
  }
};