import React, { useEffect, useState } from 'react'
import classes from "./contact-form.module.css"
import Notification from '../ui/notification'

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
    }
}

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(''); // pending, success, error
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage
            });

            setRequestStatus('success');
            setEnteredMessage('')
            setEnteredEmail('')
            setEnteredName('')

        } catch (error) {
            console.log(error)
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending Messages....',
            message: 'Your message is on way!'
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Your message has been sent successfully!',
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError,
        }
    }


    return (
        <section className={classes.contact}>
            <h1>How can I help you</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={event => setEnteredEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={enteredName}
                            onChange={event => setEnteredName(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>
                        Your Message
                    </label>
                    <textarea
                        id='message'
                        rows='5'
                        value={enteredMessage}
                        onChange={event => setEnteredMessage(event.target.value)}
                        required
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    )
}

export default ContactForm