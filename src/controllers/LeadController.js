class LeadController {
  static fetchLeads() {
    const leads = [];
    const idLeadLimit = this.getNextInsertLeadId();
    for (let i = 1; i < idLeadLimit; i += 1) {
      leads.push(this.fetchLeadById(i));
    }
    return leads;
  }

  static fetchLeadById(id) {
    return JSON.parse(localStorage.getItem(`lead-${id}`));
  }

  static saveLead(lead) {
    const idLead = this.getNextInsertLeadId();
    localStorage.setItem(`lead-${idLead}`, JSON.stringify(Object.assign(lead, { id: idLead })));
    this.incrementInsertLeadId();
  }

  static updateLead(lead) {
    localStorage.setItem(`lead-${lead.id}`, JSON.stringify(lead));
  }

  static initializeInsertLeadId() {
    if (!localStorage.getItem('idCounter')) {
      localStorage.setItem('idCounter', '0');
    }
  }

  static getNextInsertLeadId() {
    return parseInt(localStorage.getItem('idCounter'), 10) + 1;
  }

  static incrementInsertLeadId() {
    localStorage.setItem('idCounter', `${parseInt(localStorage.getItem('idCounter'), 10) + 1}`);
  }
}

export default LeadController;
