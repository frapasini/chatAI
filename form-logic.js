function determineUserAudience(data) {
    try {
        let detectedAudiences = [];
        
        // Forfettario
        if (data['fiscal_regime'] === 'Forfettario') {
            detectedAudiences.push('13b95dc3-3762-48a2-a974-29de71aa09fc');
        }
    
        // Semplificato
        if (data['fiscal_regime'] === 'Semplificato') {
            detectedAudiences.push('acf5cfe8-02eb-424f-92d7-3cd7f95c6c7f');
        }

        // Minimi
        if (data['fiscal_regime'] === 'Minimi') {
            detectedAudiences.push('a81eaa84-0042-49a5-b24c-74de0ef114dd');
        }
    
        // GS INPS
        if (data['welfare_institution'] === 'GS INPS') {
            detectedAudiences.push('bf65c246-96e5-4fcf-8bf1-5dd67c75dd95');
        }

        // ENPAP
        if (data['welfare_institution'] === 'ENPAP') {
            detectedAudiences.push('ef0f7d86-5528-4bc3-8157-3e45a1ffd0f8');
        }

        // ENPAPI
        if (data['welfare_institution'] === 'ENPAPI') {
            detectedAudiences.push('c208a9ab-8b04-473e-8c2f-04ba3a9b21e4');
        }

        // ENPAM
        if (data['welfare_institution'] === 'ENPAM') {
            detectedAudiences.push('d4db91c8-e279-4c01-8af4-87c08ae9f8d2');
        }

        // CASSA FORENSE
        if (data['welfare_institution'] === 'CASSA FORENSE') {
            detectedAudiences.push('d0a49afa-23af-4443-8e74-b43e35013d68');
        }

        // INARCASSA
        if (data['welfare_institution'] === 'INARCASSA') {
            detectedAudiences.push('cafa59b4-7358-450c-b715-056ee38329be');
        }

        // INPS Artigiani
        if (data['welfare_institution'] === 'INPS ART') {
            detectedAudiences.push('9cf82497-48c8-4fee-a99a-28440d289a31');
        }

        // INPS Commercianti
        if (data['welfare_institution'] === 'INPS COM') {
            detectedAudiences.push('7e80dfca-bc2e-45b6-b480-3a2fc5e91fe7');
        }

        // Lavoratori Autonomi
        if (data['welfare_institution'] != 'INPS COM'
            && data['welfare_institution'] != 'INPS ART') {
            detectedAudiences.push('b973308d-4134-40b8-9837-6fabfa0fb8c5');
        }
    
        // Ditte Individuali
        if (data['welfare_institution'] === 'INPS COM'
            || data['welfare_institution'] === 'INPS ART') {
            detectedAudiences.push('47b276eb-b48f-4913-b2b9-06e7abbb7767');
        }
    
        // Clienti Attivi
        if (data['payment_status'] === 'CLIENTE') {
            detectedAudiences.push('4c50394a-5d9a-4316-9c00-a4ccf45bbe2e');
        }
    
        // Clienti Base
        if (data['payment_status'] === 'BASE') {
            detectedAudiences.push('8a2dbe72-ef9a-4e7c-87f1-6c47cf17a983');
        }
    
        // Clienti Affittacamere/Cav
        if (data['ateco_1'] === '55.20.42'
            || data['ateco_1'] === '55.20.41') {
            detectedAudiences.push('1eceb2f8-afc1-4a19-9a29-8c2ab58784b2');
        }
    
        // Clienti per OSS/IOSS
        if (data['ateco_1'] === '47.12.90'
            || data['ateco_1'] === '46.89.00'
            || data['ateco_1'] === '58.11.00'
            || data['ateco_1'] === '60.39.00'
            || data['ateco_1'] === '58.29.00') {
            detectedAudiences.push('d6d1f5e0-fa0f-48f5-a4c0-df2d5a2d0a6b');
        }

        // Sanitari
        if (data['ateco_1'] === '74.99.21'
            || data['ateco_1'] === '85.69.01'
            || data['ateco_1'] === '86.94.02'
            || data['ateco_1'] === '86.95.00'
            || data['ateco_1'] === '86.99.03'
            || data['ateco_1'] === '86.99.09'
            || data['ateco_1'] === '88.99.04'
            || data['ateco_1'] === '88.99.09'
            || data['welfare_institution'] === 'ENPAP'
            || data['welfare_institution'] === 'ENPAPI'
            || data['welfare_institution'] === 'ENPAM') {
            detectedAudiences.push('c60ee9af-3054-4c02-9681-ee4ec0e9c7e5');
        }

        // Non Sanitari
        if (data['ateco_1'] != '74.99.21'
            && data['ateco_1'] != '85.69.01'
            && data['ateco_1'] != '86.94.02'
            && data['ateco_1'] != '86.95.00'
            && data['ateco_1'] != '86.99.03'
            && data['ateco_1'] != '86.99.09'
            && data['ateco_1'] != '88.99.04'
            && data['ateco_1'] != '88.99.09'
            && data['welfare_institution'] != 'ENPAP'
            && data['welfare_institution'] != 'ENPAPI'
            && data['welfare_institution'] != 'ENPAM') {
            detectedAudiences.push('c60ee9af-3054-4c02-9681-ee4ec0e9c7e5');
        }
    
        // If the list is empty, assign a default or null
        const finalAudience = detectedAudiences.length > 0 ? detectedAudiences[0] : 'Default_Audience';

        console.log("Final Audience:", finalAudience);
        return {
            finalAudience: finalAudience,
            detectedAudiences: detectedAudiences
        };

    } catch (error) {
        console.error("An error occurred while determining audience:", error.message);
        return {
            finalAudience: 'Error_Audience',
            detectedAudiences: []
        };
    }
}

function updateFreshchatUser() {
  var userData = {
    fiscal_regime: document.getElementById('fiscal_regime').value,
    welfare_institution: document.getElementById('welfare_institution').value,
    payment_status: document.getElementById('payment_status').value,
    ateco_1: document.getElementById('ateco_1').value
  };
  
  var audienceResult = determineUserAudience(userData);
  var audienceId = audienceResult.finalAudience;
  
  // Generate a new unique user ID each time.
  var newUserId = "user-" + Date.now();
  console.log("Updating user. New External ID:", newUserId);
  
  window.fcWidget.setExternalId(newUserId);
  
  // Set basic user details
  window.fcWidget.user.setFirstName(document.getElementById('firstName').value);
  window.fcWidget.user.setLastName(document.getElementById('lastName').value);
  window.fcWidget.user.setEmail(document.getElementById('email').value);
  window.fcWidget.user.setPhone(document.getElementById('phone').value);

  window.fcWidget.user.setProperties({
    ssn: document.getElementById('ssn').value,
    consultant_squad_id: document.getElementById('consultant_squad_id').value,
    fiscal_regime: userData.fiscal_regime,
    welfare_institution: userData.welfare_institution,
    payment_status: userData.payment_status,
    ateco_1: userData.ateco_1,
    userAudience: audienceId
  });

  // Print audiences to the console
  console.log("Detected Audiences:", audienceResult.detectedAudiences);

  // Re-initialize the chat to reflect the new user
  window.fcWidget.close();
  setTimeout(function() {
    window.fcWidget.open();
  }, 250); // Add a small delay to ensure the widget has time to close before reopening
}
