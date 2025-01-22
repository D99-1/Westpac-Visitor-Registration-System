id = document.getElementById('issuer-id')
firstname = document.getElementById('issuer-name-first')
lastname = document.getElementById('issuer-name-last')

console.log(id)

async function idSearch(){
    const response = await fetch(`http://localhost:3000/search?id=${document.getElementById('issuer-id').value}`)
    const data = await response.json()
    document.getElementById('issuer-name-first').value = ''
    document.getElementById('issuer-name-last').value = ''
    showEmployee(data)
}

async function firstnameSearch(){
    const response = await fetch(`http://localhost:3000/search?firstname=${firstname.value}`)
    const data = await response.json()
    document.getElementById('issuer-id').value = ''
    document.getElementById('issuer-name-last').value = ''
    showEmployee(data)
}

async function lastnameSearch(){
    const response = await fetch(`http://localhost:3000/search?lastname=${lastname.value}`)
    const data = await response.json()
    document.getElementById('issuer-id').value = ''
    document.getElementById('issuer-name-first').value = ''
    showEmployee(data)
}

function showEmployee(data){
    display = document.getElementById('issuer-details-result')    
    display.innerHTML = ''
        display.innerHTML += `
        <div class="issuer-details-card">
        <div class="issuer-details-photo">
            <img src="${data[0].photo}" alt="Photo">
        </div>
        <div class="issuer-details-info">
            <h3>${data[0].firstname} ${data[0].lastname}</h3>
            <p>${data[0].id}</p>
        </div>
        </div>
        `
        document.getElementById('issue-pass').disabled = false
}

document.getElementById('issue-pass').addEventListener('click', function(){
    visitor_firstname = document.getElementById('visitor-firstname').value
    visitor_lastname = document.getElementById('visitor-lastname').value
    visitor_purpose = document.getElementById('visitor-purpose').value
    visitor_startdate = document.getElementById('visitor-start').value
    visitor_enddate = document.getElementById('visitor-end').value

    if(!visitor_firstname || !visitor_lastname){
        alert('Please fill out all fields')
        return
    }

    console.log(visitor_firstname, visitor_lastname, visitor_purpose, visitor_startdate, visitor_enddate)

    fetch('http://localhost:3000/issue-pass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            visitor_firstname: visitor_firstname,
            visitor_lastname: visitor_lastname,
            visitor_purpose: visitor_purpose,
            visitor_startdate: visitor_startdate,
            visitor_enddate: visitor_enddate
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Pass issued successfully')
    })
}
)