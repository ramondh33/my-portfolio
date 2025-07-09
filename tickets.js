// 1) Apply saved theme
(function applySavedTheme() {
  const mode = localStorage.getItem('themeMode') || 'light';
  document.documentElement.classList.toggle('dark', mode === 'dark');
})();

// 2) Fake users & tickets
const users = ['Alice','Bob','Charlie'];
const tickets = [
  { id: 101, title: 'Login Issue',     status: 'Open',        assignedTo: 'Alice' },
  { id: 102, title: 'Page Crash',      status: 'In Progress', assignedTo: 'Bob'   },
  { id: 103, title: 'Feature Request', status: 'Open',        assignedTo: 'Charlie' },
  { id: 104, title: 'Bug Report',      status: 'Closed',      assignedTo: 'Alice' }
];

// 3) Render tickets
function renderTickets() {
  const body = document.getElementById('ticketBody');
  body.innerHTML = tickets.map((t,i) => `
    <tr class="hover:bg-cardBG dark:hover:bg-darkCard transition">
      <td class="border border-border dark:border-darkBorder p-2 text-center">${t.id}</td>
      <td class="border border-border dark:border-darkBorder p-2">${t.title}</td>
      <td class="border border-border dark:border-darkBorder p-2 text-center">
        <select onchange="changeStatus(${i}, this.value)"
                class="bg-cardBG dark:bg-darkCard border border-border dark:border-darkBorder p-1 rounded">
          ${['Open','In Progress','Closed']
            .map(s => `<option ${s===t.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </td>
      <td class="border border-border dark:border-darkBorder p-2 text-center">
        <select onchange="assignTicket(${i}, this.value)"
                class="bg-cardBG dark:bg-darkCard border border-border dark:border-darkBorder p-1 rounded">
          ${users.map(u => `<option ${u===t.assignedTo?'selected':''}>${u}</option>`).join('')}
        </select>
      </td>
      <td class="border border-border dark:border-darkBorder p-2 text-center">
        <button onclick="deleteTicket(${i})" class="text-red-500 hover:text-red-700">Delete</button>
      </td>
    </tr>
  `).join('');
}

// 4) Ticket actions
function changeStatus(i, status) { tickets[i].status = status; renderTickets(); }
function assignTicket(i, user)   { tickets[i].assignedTo = user;          }
function deleteTicket(i)        { tickets.splice(i,1); renderTickets();  }

// 5) Initialize
document.addEventListener('DOMContentLoaded', renderTickets);
