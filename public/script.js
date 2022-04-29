async function loadSnippyly() {

    await Snippyly.init("UnHxMCCFcclkP4bErBL1");

    const presenceElement = Snippyly.getPresenceElement();
    presenceElement.getOnlineUsersOnCurrentDocument().subscribe((data) => {
        console.log('getOnlineUsersOnCurrentDocument in html', data);
    })

    if (localStorage.getItem('user')) {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                signIn(user.userId);
            }
        } catch (err) {
            localStorage.removeItem('user');
            window.location.reload();
        }
    } else {
        const userDetailsContainer = document.getElementById('userDetailsContainer');
        userDetailsContainer.style.display = 'none';

        const loginContainer = document.getElementById('loginContainer');
        loginContainer.style.display = 'block';
    }
}

const users = [
    {
        userId: '1',
        name: 'James Smith',
        photoUrl: '',
        email: 'james.smith@gmail.com',
        plan: 'free',
        groupId: '',
        contacts: [
            {
                userId: '2',
                name: 'Maria Garcia',
                email: 'maria.garcia@gmail.com',
            },
            {
                userId: '3',
                name: 'Sarah Wilson',
                email: 'sarah.wilson@gmail.com',
            }
        ]
    },
    {
        userId: '2',
        name: 'Maria Garcia',
        photoUrl: '',
        email: 'maria.garcia@gmail.com',
        plan: 'paid',
        groupId: '',
        contacts: [
            {
                userId: '1',
                name: 'James Smith',
                email: 'james.smith@gmail.com',
            },
            {
                userId: '3',
                name: 'Sarah Wilson',
                email: 'sarah.wilson@gmail.com',
            }
        ]
    },
    {
        userId: '3',
        name: 'Sarah Wilson',
        photoUrl: '',
        email: 'sarah.wilson@gmail.com',
        plan: 'trial',
        groupId: '',
        contacts: [
            {
                userId: '1',
                name: 'James Smith',
                email: 'james.smith@gmail.com',
            },
            {
                userId: '2',
                name: 'Maria Garcia',
                email: 'maria.garcia@gmail.com',
            }
        ]
    }
];

async function signIn(userId) {
    if (Snippyly) {
        const user = users.find((user) => user.userId === userId);
        if (user) {
            const userDetails = document.getElementById('userDetails');
            userDetails.innerText = `Hi ${user.name}`;
            const userDetailsContainer = document.getElementById('userDetailsContainer');
            userDetailsContainer.style.display = 'block';

            const loginContainer = document.getElementById('loginContainer');
            loginContainer.style.display = 'none';

            localStorage.setItem('user', JSON.stringify(user));
            await Snippyly.identify(user);
        }
    }
}

function signOut() {
    localStorage.removeItem('user');
    window.location.reload();
}