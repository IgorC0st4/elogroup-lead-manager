// Class resposible for lead querying
class LeadController {
  // Initializes the idCounter
  // idCounter is a helper variable to control
  // The number of leads registered
  static initializeInsertLeadId() {
    // Checks if idCounter has already
    // Been initialized, if not initializes with 0
    if (!localStorage.getItem('idCounter')) {
      localStorage.setItem('idCounter', '0');
    }
  }

  // Returns an array of registered leads
  static fetchLeads() {
    const leads = [];
    // idLeadLimit will be used as the upper limit of the loop
    // Since the id starts at 1 and is incremented at
    // Every new registered lead
    const idLeadLimit = this.getNextInsertLeadId();
    for (let i = 1; i < idLeadLimit; i += 1) {
      leads.push(this.fetchLeadById(i));
    }
    return leads;
  }

  // Fetches and parse a singles lead
  // Helper function to fetchLeads()
  static fetchLeadById(id) {
    return JSON.parse(localStorage.getItem(`lead-${id}`));
  }

  // Register new lead and
  // Increment idCounter
  static saveLead(lead) {
    // Gets the next valid id to be inserted.
    // Ex: if the first lead is going to be registered
    // Then idCounter is currently 0
    // And idLead will receive 1
    const idLead = this.getNextInsertLeadId();
    localStorage.setItem(`lead-${idLead}`, JSON.stringify(Object.assign(lead, { id: idLead })));
    this.incrementInsertLeadId();
  }

  static updateLead(lead) {
    localStorage.setItem(`lead-${lead.id}`, JSON.stringify(lead));
  }

  // Parses idCounter to integer value and
  // Increments by 1 to return next valid id
  static getNextInsertLeadId() {
    return parseInt(localStorage.getItem('idCounter'), 10) + 1;
  }

  static incrementInsertLeadId() {
    localStorage.setItem('idCounter', `${parseInt(localStorage.getItem('idCounter'), 10) + 1}`);
  }
}

export default LeadController;
