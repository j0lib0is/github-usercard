import axios from 'axios';
/*
  ✅ STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/j0lib0is
*/

function getUsers(url, selector) {
  // fetch data
  axios.get(url).then(user => {
    // set selector for where you want to store cards
    const cardContainer = document.querySelector(selector);
    // use the fetched data to make and append a user card
    cardContainer.appendChild(makeUserCard(user.data));
  }).catch(err => {
    console.log(err);
  })
}


/*
  ✅ STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/


/*
  ✅ STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

getUsers('https://api.github.com/users/j0lib0is', '.cards');


/*
  ✅ STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers, manually find some other users' github handles, or use the list found at the bottom of the page. Get at least 5 different Github usernames and add them as individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each user, and adding that card to the DOM.
*/

const followersArray = [];

function findFriends(url) {
  // fetch user list
  axios.get(url).then(users => {
    // add each user's username from the list to the followersArray
    for (let i = 0; i < users.data.length; i++) {
      followersArray.push(users.data[i].login);
    }
    // for each user in the followersArray, we'll create a user card
    followersArray.forEach(user => {
      // generate a url that identifies each user's data object
      const userData = `https://api.github.com/users/${user}`
      // use the getUsers function to create user cards
      getUsers(userData, '.cards');
    });
  }).catch(err => {
    console.log(err);
  })
}

findFriends('https://api.github.com/users/brianlovin/followers');


/*
  ✅ STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function makeUserCard({ avatar_url, name, login, location, html_url, followers, following, bio }) {
  // create DOM elements
  const userCard = document.createElement('div');
  const userAvatar = document.createElement('img');
  const userInfo = document.createElement('div');
  const userName = document.createElement('h3');
  const userUsername = document.createElement('p');
  const userLocation = document.createElement('p');
  const userProfile = document.createElement('p');
  const userGithub = document.createElement('a');
  const userFollowers = document.createElement('p');
  const userFollowing = document.createElement('p');
  const userBio = document.createElement('p');
  // build element
  userCard.appendChild(userAvatar);
  userCard.appendChild(userInfo);
  userInfo.appendChild(userName);
  userInfo.appendChild(userUsername);
  userInfo.appendChild(userLocation);
  userInfo.appendChild(userProfile);
  userProfile.appendChild(userGithub);
  userInfo.appendChild(userFollowers);
  userInfo.appendChild(userFollowing);
  userInfo.appendChild(userBio);
  // add classes
  userCard.classList.add('card');
  userInfo.classList.add('card-info');
  userName.classList.add('name');
  userUsername.classList.add('username');
  // add content
  userAvatar.src = avatar_url;
  userName.textContent = name;
  userUsername.textContent = login;
  userLocation.textContent = `Location: ${location}`;
  userProfile.textContent = `Profile: ${userGithub}`;
  userGithub.href = html_url;
  userFollowers.textContent = `Followers: ${followers}`;
  userFollowing.textContent = `Followers: ${following}`;
  userBio.textContent = bio;
  // return object
  return userCard;
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
