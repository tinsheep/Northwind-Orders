import {
    getLoggedInEmployee
} from '../identity/identityClient.js';
import 'https://statics.teams.cdn.office.net/sdk/v1.11.0/js/MicrosoftTeams.min.js';
import { inTeams } from '../modules/teamsHelpers.js';
async function displayUI() {

    const displayElement = document.getElementById('content');
    const ordersElement = document.getElementById('orders');
    const messageDiv = document.getElementById('message');
    
    // Handle incoming deep links by redirecting to the selected order
    if (await inTeams()) {

        microsoftTeams.initialize(async () => {
            microsoftTeams.getContext(async (context) => {
                if (context.subEntityId) {
                    window.location.href = `/pages/orderDetail.html?orderId=${context.subEntityId}`;
                }
            });
        });
    }

    try {
        const employee = await getLoggedInEmployee();
        if (employee) {
            
            displayElement.innerHTML = `
                <h3>Orders for ${employee.displayName}<h3>
            `;

            employee.orders.forEach(order => {
                const orderRow = document.createElement('tr');
                orderRow.innerHTML = `<tr>
                <td><a href="/pages/orderDetail.html?orderId=${order.orderId}">${order.orderId}</a></td>
                <td>${(new Date(order.orderDate)).toDateString()}</td>
                <td>${order.shipName}</td>
                <td>${order.shipAddress}, ${order.shipCity} ${order.shipRegion || ''} ${order.shipPostalCode || ''} ${order.shipCountry}</td>
            </tr>`;
                ordersElement.append(orderRow);

            });
        }
    }
    catch (error) {            // If here, we had some other error
        messageDiv.innerText = `Error: ${JSON.stringify(error)}`;
    }
}

displayUI();