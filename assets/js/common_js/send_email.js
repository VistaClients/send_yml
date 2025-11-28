

async function fetch_token(){
   fetch('send_email_token.json')
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const first_token = data.first_token;
        const second_token = data.second_token;
        console.log("Token:", token); 
            return first_token+second_token;
  
    })
    .catch(error => {
        console.error("Failed to fetch token:", error);
            return null;
  
    });
  
  }
  

window.sendEmailDataToGitHub = async function (emailSubject, emailBody) {
  const secret  = await fetch_token();
  const response = await fetch('https://api.github.com/repos/VistaClients/send_yml/dispatches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${secret}`,  
    },
    body: JSON.stringify({
      event_type: 'send_email', 
      client_payload: {
        subject: "Test Subject",
        to_email:'fashionsense482@gmail.com',
        body: "This is the body of the email.",
      }
    })
  });

  if (response.ok) {
    console.log('GitHub Actions triggered successfully');
  } else {
    console.error('Error triggering GitHub Actions');
  }
};

