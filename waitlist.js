// waitlist.js

// Referral System Logic
let referrals = [];

function addReferral(referralCode) {
    if (!referrals.includes(referralCode)) {
        referrals.push(referralCode);
    }
}

// Form Handling
document.getElementById('waitlistForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const referralCode = document.getElementById('referralCode').value;
    addReferral(referralCode);
    alert('Successfully added to the waitlist!');
});

// WhatsApp Share Integration
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join my waitlist!');
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsappUrl, '_blank');
}

// Example usage on a button click
// <button onclick='shareOnWhatsApp()'>Share on WhatsApp</button
