document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 5px 25px rgba(114, 9, 183, 0.4)';
    } else {
        header.style.padding = '1.5rem 0';
        header.style.boxShadow = '0 2px 20px rgba(114, 9, 183, 0.3)';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const videoBg = document.getElementById('video-bg');
    videoBg.playbackRate = 0.7;

    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            card.classList.toggle('flipped');
        });
    });

    
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const webhookURL = 'https://discord.com/api/webhooks/1365775274565963868/aKWllqmSME7CclzZDZX4pMtFT3LOsLQGRO3vtoevPqXBkRxtYVJw15ZSlgSDYP9X8QQ8';

        const discordMessage = {
            content: '@everyone',
            embeds: [{
            title: '📨 Nouvelle demande de contact',
            color: 0x7209b7,
            fields: [
                {
                    name: '👤 Pseudo',
                    value: name,
                    inline: true
                },
                {
                    name: '📧 Contact',
                    value: email,
                    inline: true
                },
                {
                    name: '📝 Type de projet',
                    value: subject
                },
                {
                    name: '💬 Détails',
                    value: message
                }
            ],
            timestamp: new Date().toISOString()
            }]
        };

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordMessage)
            });

            if (response.ok) {
                alert('Message envoyé avec succès!');
                this.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi du message');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
        }
    });
});