function generateDPTable() {
      const coinsInput = document.getElementById('coins').value;
      const amountInput = parseInt(document.getElementById('amount').value);
      const errorDiv = document.getElementById('error');
      const tableContainer = document.getElementById('dp-table-container');
      const resultDiv = document.getElementById('result');

      errorDiv.textContent = '';
      tableContainer.innerHTML = '';
      resultDiv.textContent = '';
      resultDiv.classList.add("hidden");

      if (!coinsInput || isNaN(amountInput) || amountInput < 0) {
        errorDiv.textContent = '⚠️ Please enter valid coins and a non-negative amount.';
        return;
      }

      try {
        const coins = coinsInput.split(',').map(c => parseInt(c.trim())).filter(c => !isNaN(c));
        if (coins.length === 0) {
          errorDiv.textContent = '⚠️ Please enter at least one valid coin value.';
          return;
        }

        const dp = coinChangeWaysDP(coins, amountInput);
        const result = dp[coins.length][amountInput];

        createDPTable(coins, amountInput, dp, tableContainer);

        resultDiv.textContent = `🧾 Number of ways to make ${amountInput}: ${result}`;
        resultDiv.classList.remove("hidden");

      } catch (err) {
        errorDiv.textContent = '❌ An error occurred: ' + err.message;
      }
    }

    function coinChangeWaysDP(coins, amount) {
      const n = coins.length;
      const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));
      for (let i = 0; i <= n; i++) dp[i][0] = 1;

      for (let i = 1; i <= n; i++) {
        const coin = coins[i - 1];
        for (let j = 0; j <= amount; j++) {
          if (j < coin) {
            dp[i][j] = dp[i - 1][j];
          } else {
            dp[i][j] = dp[i - 1][j] + dp[i][j - coin];
          }
        }
      }
      return dp;
    }

    function createDPTable(coins, amount, dp, container) {
      const table = document.createElement('table');
      table.className = "w-full table-auto border-collapse text-sm text-center text-gray-300";

      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `<th class="bg-gray-700 border border-gray-600 p-2">Coins \\ Amount</th>`;
      for (let j = 0; j <= amount; j++) {
        headerRow.innerHTML += `<th class="bg-gray-700 border border-gray-600 p-2">${j}</th>`;
      }
      table.appendChild(headerRow);

      for (let i = 1; i <= coins.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<th class="bg-gray-800 border border-gray-700 p-2">${coins[i - 1]}</th>`;
        for (let j = 0; j <= amount; j++) {
          row.innerHTML += `<td class="border border-gray-700 p-2">${dp[i][j]}</td>`;
        }
        table.appendChild(row);
      }

      container.appendChild(table);
    }

    window.onload = generateDPTable;