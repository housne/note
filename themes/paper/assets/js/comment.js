async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getCommentData() {
  const data = {
    fields: {
      name: document.querySelector('input[name="fields[name]"]').value,
      email: document.querySelector('input[name="fields[email]"]').value,
      website: document.querySelector('input[name="fields[website]"]').value,
      message: document.querySelector('textarea[name="fields[message]"]').value
    },
    options: {
      slug: document.querySelector('input[name="options[slug]"]').value
    }
  }
  return data
}

document.getElementById('staticman_form').addEventListener('submit', async e => {
  e.preventDefault()
  const form = e.target
  const url = form.getAttribute('action')
  const data = getCommentData()
  const submitButton = document.getElementById('comment_submit_button')
  submitButton.disabled = true
  const result = await postData(url, data)
  submitButton.disabled = false
  if (!result.success) {
    alert(window.COMMENT_SUBMIT_FAIL_MESSAGE)
  } else {
    alert(window.COMMENT_SUBMIT_SUCCESS_MESSAGE)
  }
})