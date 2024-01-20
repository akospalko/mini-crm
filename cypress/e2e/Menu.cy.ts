  // TYPE
  type MenuAccessT = 'create' |  'edit-client' |  'edit-property'
  
  describe('Menu test: open (create, edit), close, render content ', () => {
  // Check and click create item button - open and close buttons
  const checkAndClickCreateButton = (testID: string) => {
    cy.get(`[data-testid=${testID}]`).should('exist');
    cy.get(`[data-testid=${testID}]`).click();
  } 

  // Check if client/property item exist if so check and click(open) edit button 
  const checkAndClickEditButton = (testIDButton: string, testIDManagementItem: string, dataAction: string) => {
    // Find element, create alias
    cy.get(`[data-testid=${testIDManagementItem}]`).as('managementItem');

    // Check if the element exists and store the result in an alias
    cy.get('@managementItem').should('exist');

    // Use the alias in an if statement
    cy.get('@managementItem').then((element) => {
      const isItemDataAvailable = element.length > 0;

      if (isItemDataAvailable) {
        cy.get(`[data-testid=${testIDButton}][data-action='${dataAction}']:first`).should('exist');
        cy.get(`[data-testid=${testIDButton}][data-action='${dataAction}']:first`).click();
      }})
  } 

  // Open and close menu modal for, check elements presence using create new item (client or property) button 
  const openAndCloseMenuModal = (route: string, access: MenuAccessT) => {
    cy.visit(route);
 
    // Open modal
    let activeOpenMenuButton; 
    switch(access) {
      case 'create':
        activeOpenMenuButton = () => checkAndClickCreateButton('button-menu-open');
        break;
      case 'edit-client': 
        activeOpenMenuButton = () => checkAndClickEditButton('button-manage-item', 'management-client-item', 'data-action-edit');
        break; 
      case 'edit-property': 
        activeOpenMenuButton = () => checkAndClickEditButton('button-manage-item','management-property-item', 'data-action-edit');
        break; 
      default: 
        throw new Error(`Unknown access keyword: ${access}`);
  }

    activeOpenMenuButton();

    // Modal opened - check menu ui elements visibility 
    cy.get('[data-testid="menu-backdrop"]').should('be.visible'); 
    cy.get('[data-testid=menu-modal]').should('be.visible'); 
    cy.get('[data-testid=menu-button-container]').should('be.visible'); 
    cy.get('[data-testid=button-menu-close]').should('be.visible');
    cy.get('[data-testid="icon"]').should('be.visible');
    cy.get('[data-testid=menu-title]').should('be.visible'); 
    cy.get('[data-testid=form-element]').should('be.visible');
    
    // Close modal
    checkAndClickCreateButton('button-menu-close');
    
    // Modal closed - check menu ui elements presence in DOM 
    cy.get('[data-testid=menu-backdrop]').should('not.exist');
    cy.get('[data-testid=menu-modal]').should('not.exist'); 
    cy.get('[data-testid=menu-button-container]').should('not.exist'); 
    cy.get('[data-testid=button-menu-close]').should('not.exist');
    cy.get('[data-testid=menu-title]').should('not.exist'); 
    cy.get('[data-testid=form-element]').should('not.exist'); 
  }

  // TESTS
  // Access menu from client management pg. create menu button 
  it('opens and closes the menu modal on client management page', () => {
    openAndCloseMenuModal('http://localhost:5173/manage-clients', 'create');
  });

  // Access menu from property management pg. create menu button 
  it('opens and closes the menu modal on another route', () => {
    openAndCloseMenuModal('http://localhost:5173/manage-properties', 'create');
  });
  
  // Access menu from client management pg. edit menu button 
  it('opens and closes the menu modal on client management page', () => {
    openAndCloseMenuModal('http://localhost:5173/manage-clients', 'edit-client');
  });

  // Access menu from property management pg. edit menu button 
  it('opens and closes the menu modal on another route', () => {
    openAndCloseMenuModal('http://localhost:5173/manage-properties', 'edit-property');
  });
});