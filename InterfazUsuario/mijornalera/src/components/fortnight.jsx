import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown, Input, Table, Grid, Form, Modal,Icon , Label, Segment, Card, List, Image,  Dropdown as SUIDropdown, Input as SUIInput } from 'semantic-ui-react';
import GroupFortnight from './groupfortnight'; // This component should be modified to be presentational (stateless)
import companyLogo from "../images/logoNorte.jpeg";
//import { Card, CardContent, CardTitle, CardDescription } from "./ui/card";



class Fortnight extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // Global construction info
        construction: { id: '123', name: 'Construcción Ejemplo' },        
        // Compute the 15-day array (each day has day, date, weekend, nonWorkable)
        fortnightDays: this.generateFortnightDays(),
        contextMenuData: { show: false },
        contextMenuHovered: false,
        categoryPopupData: { show: false, popupType: "", mode: "select", selectedCategory: null, newCategoryName: "", error: "", errorDropdown: "", warning: "" },
        ausencePopupData: { show: false, popupType: "", mode: "select", selectedReason: null, newReasonName: "", error: "", errorDropdown: "", warning: "" },
        employeesPopupData : { show: false, mode: "select", selectedEmployee: null, error: "", warning: "" },

        ausenceReasonsCompany: [
            { id: 1, name: 'Sick', displayName: 'disse', order: 0 },
            { id: 2, name: 'Vacation', displayName: 'vac', order: 1 },
        ],
        hoursCategoriesCompany: [
          { id: 1, name: 'Nr', description: "Normal", order: 0 },
          { id: 2, name: 'Noc', description: "Nocturnas", order: 1 },
          { id: 3, name: 'Lluvia', description: "LLuvia",  order: 2 },
          { id: 4, name: 'Ex', description: "Extra", order: 3 },
        ],
        employeesCompany: [
            { id: 1, name: 'Juan Pérez',  },
              { id: 2, name: 'María Gómez' },
              { id: 3, name: 'Carlos López'},
              { id: 4, name: 'Ana Martínez'},
              { id: 5, name: 'Luis Sánchez' },
              { id: 6, name: 'Marta Fernández'},
              { id: 9, name: 'María Jose Porteiro' },
              { id: 10, name: 'Miguel Rodriguez' },
              { id: 11, name: 'Johnatan Samuel' },
              { id: 12, name: 'Laura Pradere' },
              { id: 13, name: 'Bernanrdo Richtemberg' },
        ],
        // An array of groupFortnight objects – each group holds its own data
        groupFortnights:
        [
                      
            {
              id: 1,
              name: 'Grupo gerencia',
              hoursCategoriesFortnight: [
                { id: 1, name: 'Nr', description: "Normal", order: 0 },
                { id: 2, name: 'Noc', description: "Nocturnas", order: 1 },
                { id: 4, name: 'Ex', description: "Extra", order: 2 },
              ],
              hoursCategoriesConstruction: [
                { id: 1, name: 'Nr', description: "Normal", order: 0 },
                { id: 2, name: 'Noc', description: "Nocturnas", order: 1 },
                { id: 4, name: 'Ex', description: "Extra", order: 2 },
              ],
              ausenceReasonsFortnight: [
                { id: 1, name: 'Sick', displayName: 'disse', order: 0 },
                { id: 2, name: 'Vacation', displayName: 'vac', order: 1 },
              ],
              ausenceReasonsConstruction: [
                { id: 1, name: 'Sick', displayName: 'disse', order: 0 },
                { id: 2, name: 'Vacation', displayName: 'vac', order: 1 },
              ],
              employees: [
                  { id: 9, name: 'María Jose Porteiro', order: 1 },
              ],
              records: {}
              },
              {
                id: 2,
                name: 'Grupo Jornal',
                hoursCategoriesFortnight: [
                  { id: 1, name: 'Nr', description: "Normal", order: 0 },
                  { id: 2, name: 'Noc', description: "Nocturnas", order: 1 },
                  { id: 3, name: 'Lluvia', description: "LLuvia",  order: 2 },
                  { id: 4, name: 'Ex', description: "Extra", order: 3 },
                ],
                hoursCategoriesConstruction: [
                  { id: 1, name: 'Nr', description: "Normal", order: 0 },
                  { id: 2, name: 'Noc', description: "Nocturnas", order: 1 },
                  { id: 3, name: 'Lluvia', description: "LLuvia",  order: 2 },
                  { id: 4, name: 'Ex', description: "Extra", order: 3 },
                ],
                ausenceReasonsFortnight: [
                  { id: 1, name: 'Sick', displayName: 'disse', order: 0 },
                  { id: 2, name: 'Vacation', displayName: 'vac', order: 1 },
                ],
                ausenceReasonsConstruction: [
                  { id: 1, name: 'Sick', displayName: 'disse', order: 0 },
                  { id: 2, name: 'Vacation', displayName: 'vac', order: 1 },
                ],
                employees: [
                    { id: 1, name: 'Juan Pérez', order: 0 },
                    { id: 2, name: 'María Gómez', order: 1 },
                    { id: 3, name: 'Carlos López', order: 2 },
                    { id: 4, name: 'Ana Martínez', order: 3 },
                    { id: 5, name: 'Luis Sánchez', order: 4 },
                    { id: 6, name: 'Marta Fernández', order: 5 },
                ],
                records: {}
                }

        ]
    };
  }

  generateFortnightDays = () => {
    let days = [];
    for (let i = 1; i <= 15; i++) {
      const dateObj = new Date(this.props.year, 0, i);
      const dateStr = `${dateObj.getDate().toString().padStart(2, '0')}/01/${this.props.year}`;
      const weekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
      days.push({ day: i, date: dateStr, weekend: weekend, nonWorkable: false });
    }
    return days;
  };

  getGroupIndex(groupId){
    return this.state.groupFortnights.findIndex( g => {return g.id == groupId})
  }

  // Example event handler passed to children.
  handleSave = (groupData) => {
    console.log("Group save:", groupData.records);
  };

  // You would add additional handlers here that update the state for the appropriate group,
  // for example, onEmployeeFilterChange, onDateRangeChange, onAbsenceReasonChange, onHoursChange, etc.
  // For this example, we assume that each handler receives a group id to update that specific group.
  // For simplicity, here we'll just log the events.
  handleGroupChange = (groupId, field, value) => {
    const newGroups = this.state.groupFortnights.map(group => {
      if (group.groupId === groupId) {
        return { ...group, [field]: value };
      }
      return group;
    });
    this.setState({ groupFortnights: newGroups });
  };





  handleSetNonWorkableDay = (dayObj) => {
    const updatedDays = this.state.fortnightDays.map(d =>
      d.day === dayObj.day ? { ...d, nonWorkable: true } : d
    );    
    this.setState({ fortnightDays: updatedDays });

    // update for all groups its record values as 0, since non workable
    const groupFortnights =  this.state.groupFortnights
    groupFortnights.forEach(group => {        
        const updatedRecords = group.records;
        group.employees.forEach(employee => {
            if (!updatedRecords[employee.id]) updatedRecords[employee.id] = {};
            updatedRecords[employee.id][dayObj.day] = { absenceReason: "", hours: {} };
          });                    
          
    })
    this.setState({ groupFortnights: groupFortnights });
    
  };

  handleSetLaborableDay = (dayObj) => {
    const updatedDays = this.state.fortnightDays.map(d =>
      d.day === dayObj.day ? { ...d, nonWorkable: false } : d
    );
    this.setState({ fortnightDays: updatedDays });
  };


  onAddRemoveHoursCategories = (actionType, cat, catType, groupId) =>{

    if (catType == "fortnight"){
        if (actionType === "remove") {
            this.hoursCategoriesFortnightChange(groupId, cat, actionType);
        }
    }
    else { //catType == "construction") 
        if (actionType === "remove") {
          this.hoursCategoriesConstructionChange(groupId, cat, actionType);

        }       
    }           
  }

  hoursCategoriesFortnightChange = (groupId, cat, actionType) =>{
    this.setState(prevState => {
      const updatedGroups = [...prevState.groupFortnights];
      const index = this.getGroupIndex(groupId);
      let hoursCategoriesFortnight = []
      if (actionType == "remove"){
        hoursCategoriesFortnight = updatedGroups[index].hoursCategoriesFortnight.filter(c => c.id !== cat.id) 
      }        
      else{
        hoursCategoriesFortnight = [...updatedGroups[index].hoursCategoriesFortnight, cat]
      }
         

      updatedGroups[index] = { 
          ...updatedGroups[index],  // Copy the existing group
          hoursCategoriesFortnight: hoursCategoriesFortnight,           
      }
      return { groupFortnights: updatedGroups };
   
    });
  }

  hoursCategoriesConstructionChange = (groupId, cat, actionType) =>{
    this.setState(prevState => {
      const updatedGroups = [...prevState.groupFortnights];
      const index = this.getGroupIndex(groupId);

      let hoursCategoriesConstruction = []
      let hoursCategoriesFortnight = []
      let  hoursCategoriesCompany  = []
      if (actionType == "remove"){
        hoursCategoriesConstruction = updatedGroups[index].hoursCategoriesConstruction.filter(c => c.id !== cat.id) 
        hoursCategoriesFortnight = updatedGroups[index].hoursCategoriesFortnight.filter(c => c.id !== cat.id);
      }        
      else{
        hoursCategoriesConstruction = [...updatedGroups[index].hoursCategoriesConstruction, cat];
        hoursCategoriesFortnight = [...updatedGroups[index].hoursCategoriesFortnight, cat];
      }
        
        
      updatedGroups[index] = { 
          ...updatedGroups[index],  // Copy the existing group           
          hoursCategoriesConstruction: hoursCategoriesConstruction,
          hoursCategoriesFortnight: hoursCategoriesFortnight
      }
      return { groupFortnights: updatedGroups };             
  });
  }
 
  onAddRemoveEmployeesGroup = (groupId, emp, actionType) =>{
    this.setState(prevState => {
      const updatedGroups = [...prevState.groupFortnights];
      const index = this.getGroupIndex(groupId);
      let employeesGroup = []
      if (actionType == "remove"){
        employeesGroup = updatedGroups[index].employees.filter(c => c.id !== emp.id) 
      }        
      else{
        employeesGroup = [...updatedGroups[index].employees, emp]
      }
         

      updatedGroups[index] = { 
          ...updatedGroups[index],  // Copy the existing group
          employees: employeesGroup,           
      }
      return { groupFortnights: updatedGroups };
   
    });
  }

  onAddRemoveAusenceReasons = ( actionType, ausence, ausenceType, groupId) => {
    if (ausenceType == "fortnight"){
        if (actionType === "remove") {
            this.setState(prevState => ({
              ausenceReasonsFortnight: prevState.ausenceReasonsFortnight.filter(() => false)
            }));

            this.setState(prevState => {
                const updatedGroups = [...prevState.groups];
                const index = this.getGroupIndex(groupId);
                updatedGroups[index] = { 
                    ...updatedGroups[index],  // Copy the existing group
                    ausenceReasonsFortnight: updatedGroups[index].ausenceReasonsFortnight.filter(c => c.id !== ausence.id) 
                }
                return { groupFortnights: updatedGroups };
             
            });
        }
    }
   
    else { //ausenceType == "construction") 
      if (actionType === "remove") {
        this.setState(prevState => ({
          ausenceReasonsConstruction: prevState.ausenceReasonsConstruction.filter(() => false),
          ausenceReasonsFortnight: prevState.ausenceReasonsFortnight.filter(() => false)
        }));
      }
    }
  }


  onSaveRecords = (records, groupId) => {
    
    this.setState(prevState => {
      const updatedGroups = [...prevState.groupFortnights];
      const index = this.getGroupIndex(groupId);
     
         

      updatedGroups[index] = { 
          ...updatedGroups[index],  // Copy the existing group
          records: records,           
      }
      return { groupFortnights: updatedGroups };
    })
  }

    // Category Popup Handlers
    handleOpenCategoryPopup = (popupType, groupId) => {
        this.setState({
          categoryPopupData: {
            show: true,
            popupType: popupType, // "quincena" or "obra"
            mode: "select",
            selectedCategory: null,
            newCategoryName: "",
            newCategoryDescription: "",
            error: "",
            warning: "",
            groupId: groupId
          }
        });
      };

      // Ausence Popup Handlers
      handleOpenAusencePopup = (popupType, actionType, groupId) => {
      this.setState({
        ausencePopupData: {
          show: true,
          popupType: popupType, // "quincena" or "obra"
          mode: "select",
          selectedAusence: null,
          newAusenceName: "",
          actionType: actionType,
          error: "",
          warning: "",
          groupId: groupId
        }
      });
    };
    
    handleOpenEmplyeesPopup = (groupId) => {
      this.setState({
        employeesPopupData: {
          show: true,     
          mode: "select",
          selectedEmployee: null,        
          error: "",
          warning: "",
          groupId: groupId
        }
      });
    };

      handleCategoryNameChange = (value) => {
        let error = "";
        let warning = "";
        const trimmed = value.trim().toLowerCase();
        if (!trimmed) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, newCategoryName: value, error: "", warning: "" }
          }));
          return;
        }
        const exists = this.state.hoursCategoriesCompany.find(cat => cat.name.trim().toLowerCase() === trimmed);
        if (exists) error = "La categoría ya existe.";
        else {
          const similar = this.state.hoursCategoriesCompany.find(cat => {
            const existing = cat.name.trim().toLowerCase();
            let matchCount = 0;
            for (let i = 0; i < Math.min(existing.length, trimmed.length); i++) {
              if (existing[i] === trimmed[i]) matchCount++;
            }
            return matchCount / Math.max(existing.length, trimmed.length) >= 0.9;
          });
          if (similar) warning = "La categoría es similar a una existente.";
        }
        this.setState(prevState => ({
          categoryPopupData: { ...prevState.categoryPopupData, newCategoryName: value, error, warning }
        }));
      };

      handleCategoryDescriptionChange (value){
        this.setState(prevState => ({
          categoryPopupData: { ...prevState.categoryPopupData, newCategoryDescription: value}
        }));
      }
    
      handleAddNewCategoryFortnight = (groupId) => {
        const { newCategoryName } = this.state.categoryPopupData;
        if (!newCategoryName.trim()) return;
        const trimmed = newCategoryName.trim().toLowerCase();
        const exists = this.state.hoursCategoriesCompany.find(cat => cat.name.trim().toLowerCase() === trimmed);
        if (exists) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, error: "La categoría ya existe." }
          }));
          return;
        }
        const similar = this.state.hoursCategoriesCompany.find(cat => {
          const existing = cat.name.trim().toLowerCase();
          let matchCount = 0;
          for (let i = 0; i < Math.min(existing.length, trimmed.length); i++) {
            if (existing[i] === trimmed[i]) matchCount++;
          }
          return matchCount / Math.max(existing.length, trimmed.length) >= 0.9;
        });
        if (similar) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, warning: "La categoría es similar a una existente.", error: "" }
          }));
        }
        const maxId = this.state.hoursCategoriesCompany.reduce((max, item) => Math.max(max, item.id), 0);
        const index = this.getGroupIndex(groupId);
        const newCategory = { id: maxId + 1, name: newCategoryName.trim(), order: this.state.groupFortnights[index].hoursCategoriesFortnight.length };
        this.setState(prevState => ({          
          hoursCategoriesCompany: [...prevState.hoursCategoriesCompany, newCategory],
          categoryPopupData: { show: false, popupType: "", mode: "select", selectedCategory: null, newCategoryName: "", error: "", warning: "" }
        }));
        // add to state new cat to fornight list
        this.hoursCategoriesFortnightChange(groupId, newCategory, "add");
      };
    
      handleAddExistingCategoryFortnight = (groupId) => {
        const { selectedCategory } = this.state.categoryPopupData;
        if (!selectedCategory) return;
        const index = this.getGroupIndex(groupId);

        const already = this.state.groupFortnights[index].hoursCategoriesFortnight.find(cat => cat.id === selectedCategory.id);
        if (already) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, errorDropdown: "La categoría ya está agregada." }
          }));
          return;
        }

        
        this.hoursCategoriesFortnightChange(groupId, selectedCategory, "add");
        this.setState({categoryPopupData: { show: false, popupType: "", mode: "select", selectedCategory: null, newCategoryName: "", error: "", warning: "" }});
        
      };
    
      handleAddNewCategoryConstruction = (groupId) => {
        const { newCategoryName, newCategoryDescription } = this.state.categoryPopupData;
        if (!newCategoryName.trim()) return;
        const trimmed = newCategoryName.trim().toLowerCase();
        const exists = this.state.hoursCategoriesCompany.find(cat => cat.name.trim().toLowerCase() === trimmed);

        if (exists) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, error: "La categoría ya existe." }
          }));
          return;
        }
        const similar = this.state.hoursCategoriesCompany.find(cat => {
          const existing = cat.name.trim().toLowerCase();
          let matchCount = 0;
          for (let i = 0; i < Math.min(existing.length, trimmed.length); i++) {
            if (existing[i] === trimmed[i]) matchCount++;
          }
          return matchCount / Math.max(existing.length, trimmed.length) >= 0.9;
        });
        if (similar) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, warning: "La categoría es similar a una existente.", error: "" }
          }));
        }

        const maxId = this.state.hoursCategoriesCompany.reduce((max, item) => Math.max(max, item.id), 0);
        const index = this.getGroupIndex(groupId);
        const newCategory = { id: maxId + 1, name: newCategoryName.trim(), description: newCategoryDescription.trim(), order: this.state.groupFortnights[index].hoursCategoriesFortnight.length };

        this.setState(prevState => ({          
          hoursCategoriesCompany: [...prevState.hoursCategoriesCompany, newCategory],
          categoryPopupData: { show: false, popupType: "", mode: "select", selectedCategory: null, newCategoryName: "", error: "", warning: "" }
        }));

        // add to state new cat to fornight list
        this.hoursCategoriesConstructionChange(groupId, newCategory, "add");

      };
    
      handleAddExistingCategoryConstruction = (groupId) => {
        const { selectedCategory } = this.state.categoryPopupData;
        if (!selectedCategory) return;

        const index = this.getGroupIndex(groupId);

        const already = this.state.groupFortnights[index].hoursCategoriesConstruction.find(cat => cat.id === selectedCategory.id);        
        if (already) {
          this.setState(prevState => ({
            categoryPopupData: { ...prevState.categoryPopupData, errorDropdown: "La categoría ya está agregada." }
          }));
          return;
        }
        this.setState(prevState => ({         
          hoursCategoriesCompany: [...prevState.hoursCategoriesCompany, selectedCategory],
          categoryPopupData: { show: false, popupType: "", mode: "select", selectedCategory: null, newCategoryName: "", error: "", warning: "" }
        }));
        this.hoursCategoriesConstructionChange(groupId, selectedCategory, "add");
      };

      handleAddExistingEmplyeeGroup = (groupId) => {
        const { selectedEmployee } = this.state.employeesPopupData;
        if (!selectedEmployee) return;

        const index = this.getGroupIndex(groupId);

        const already = this.state.groupFortnights[index].employees.find(emp => emp.id === selectedEmployee.id);        
        if (already) {
          this.setState(prevState => ({
            employeesPopupData: { ...prevState.employeesPopupData, error: "El empleado ya pertenece al grupo." }
          }));
          return;
        }
        this.setState({                 
          employeesPopupData: { show: false, mode: "select", selectedEmployee: null, error: "", warning: "" }
        });
        this.onAddRemoveEmployeesGroup(groupId, selectedEmployee, "add");
      };

      
    
      handleAddNewAusenceReasonFortnight = (groupId) => {
        const { newReasonName } = this.state.ausencePopupData;
        if (!newReasonName.trim()) return;
        const trimmed = newReasonName.trim().toLowerCase();
        const exists = this.state.ausenceReasonsCompany.find(reason => reason.name.trim().toLowerCase() === trimmed);
        if (exists) {
          this.setState(prevState => ({
            ausencePopupData: { ...prevState.ausencePopupData, error: "La razón ya existe." }
          }));
          return;
        }
        const similar = this.state.ausenceReasonsCompany.find(reason => {
          const existing = reason.name.trim().toLowerCase();
          let matchCount = 0;
          for (let i = 0; i < Math.min(existing.length, trimmed.length); i++) {
            if (existing[i] === trimmed[i]) matchCount++;
          }
          return matchCount / Math.max(existing.length, trimmed.length) >= 0.9;
        });
        if (similar) {
          this.setState(prevState => ({
            ausencePopupData: { ...prevState.ausencePopupData, warning: "La razón es similar a una existente.", error: "" }
          }));
        }
        const newReason = { id: Date.now(), name: newReasonName.trim(), displayName: newReasonName.trim(), order: this.state.ausenceReasonsFortnight.length };
        this.setState(prevState => ({
          ausenceReasonsFortnight: [...prevState.ausenceReasonsFortnight, newReason],
          ausenceReasonsCompany: [...prevState.ausenceReasonsCompany, newReason],
          ausencePopupData: { show: false, popupType: "", mode: "select", selectedReason: null, newReasonName: "", error: "", warning: "" }
        }));
      };
    
      handleAddExistingAusenceReasonFortnight = (groupId) => {
        const { selectedReason } = this.state.ausencePopupData;
        if (!selectedReason) return;
        const already = this.state.ausenceReasonsFortnight.find(reason => reason.id === selectedReason.id);
        if (already) {
          this.setState(prevState => ({
            ausencePopupData: { ...prevState.ausencePopupData, error: "La razón ya está agregada." }
          }));
          return;
        }
        this.setState(prevState => ({
          ausenceReasonsFortnight: [...prevState.ausenceReasonsFortnight, selectedReason],
          ausenceReasonsCompany: [...prevState.ausenceReasonsCompany, selectedReason],
          ausencePopupData: { show: false, popupType: "", mode: "select", selectedReason: null, newReasonName: "", error: "", warning: "" }
        }));
      };

  renderCategoryPopup = () => {
    const { categoryPopupData, hoursCategoriesCompany } = this.state;
    const groupId = categoryPopupData.groupId;
    if (!categoryPopupData.show) return null;
    const popupType = categoryPopupData.popupType; // "quincena" or "obra"
    return (
      <Modal open={true} onClose={() => this.setState({ categoryPopupData: { show: false } })}>
        <Modal.Header>
          {popupType === "quincena" ? "Agregar Categoria Quincena" : "Agregar Categoria Construction"}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Seleccionar categoría existente</label>
              <SUIDropdown
                placeholder="Seleccionar categoría"
                fluid
                selection
                options={hoursCategoriesCompany.map(cat => ({ key: cat.id, text: cat.description + " (" +cat.name + ")" , value: cat.id }))}
                onChange={(e, { value }) => {
                  const selected = hoursCategoriesCompany.find(cat => cat.id === value);
                  this.setState(prevState => ({
                    categoryPopupData: { ...prevState.categoryPopupData, selectedCategory: selected, error: "", warning: "" }
                  }));
                }}
                value={categoryPopupData.selectedCategory ? categoryPopupData.selectedCategory.id : ""}
              />
              {categoryPopupData.errorDropdown && <div style={{ color: 'red' }}>{categoryPopupData.errorDropdown}</div>}
            </Form.Field>
            <Button onClick={() => {
              if (popupType === "quincena") {
                this.handleAddExistingCategoryFortnight(groupId);
              } else {
                this.handleAddExistingCategoryConstruction(groupId);
              }
            }}>Agregar</Button>
            <Form.Field>
              <label>Crear nueva categoría</label>
              <SUIInput
                placeholder=" Abreviacion Categoría"
                value={categoryPopupData.newCategoryName}
                onChange={(e, { value }) => this.handleCategoryNameChange(value)}
                className='inputNewCategoryName'
              />

              <SUIInput
                placeholder= "Descripcion Categoría"
                value={categoryPopupData.newCategoryDescription}
                onChange={(e, { value }) => this.handleCategoryDescriptionChange(value)}
              />    
              {categoryPopupData.error && <div style={{ color: 'red' }}>{categoryPopupData.error}</div>}
              {categoryPopupData.warning && <div style={{ color: 'orange' }}>{categoryPopupData.warning}</div>}
            </Form.Field>
           
            <Button onClick={() => {
              if (popupType === "quincena") {
                this.handleAddNewCategoryFortnight(groupId);
              } else {
                this.handleAddNewCategoryConstruction(groupId);
              }
            }}>Crear</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  };


  renderEmployeesPopup = () => {
    const { employeesPopupData, employeesCompany } = this.state;
    const groupId = employeesPopupData.groupId;
    if (!employeesPopupData.show) return null;   
    return (
      <Modal open={true} onClose={() => this.setState({ employeesPopupData: { show: false } })}>
        <Modal.Header>
          Agregar Empleado a Grupo
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Seleccionar empleado </label>
              <SUIDropdown
                placeholder="Seleccionar categoría"
                fluid
                selection
                options={employeesCompany.map(emp => ({ key: emp.id, text: emp.name, value: emp.id }))}
                onChange={(e, { value }) => {
                  const selected = employeesCompany.find(emp => emp.id === value);
                  this.setState(prevState => ({
                    employeesPopupData: { ...prevState.employeesPopupData, selectedEmployee: selected, error: "", warning: "" }
                  }));
                }}
                value={employeesPopupData.selectedEmployee ? employeesPopupData.selectedEmployee.id : ""}
              />
               {employeesPopupData.error && <div style={{ color: 'red' }}>{employeesPopupData.error}</div>}
            </Form.Field>
            <Button onClick={() => {
             this.handleAddExistingEmplyeeGroup(groupId);
            }}>Agregar</Button>
           
          </Form>
        </Modal.Content>
      </Modal>
    );
  };


  
  renderAusencePopup = () => {
    const { ausencePopupData, ausenceReasonsCompany, actionType } = this.state;
    const groupId = ausencePopupData.groupId;
    if (!ausencePopupData.show) return null;
    const popupType = ausencePopupData.popupType; // "quincena" or "obra"
    return (
      <Modal open={true} onClose={() => this.setState({ ausencePopupData: { show: false } })}>
        <Modal.Header>
          {popupType === "quincena" ? "Agregar Razón Ausencia Fortnight" : "Agregar Razón Ausencia Construction"}
        </Modal.Header>
        <Modal.Content>
          <Form>
          {actionType == "remove" && 
            (<Form.Field>
              <label>Seleccionar razón existente</label>
              <SUIDropdown
                placeholder="Seleccionar razón"
                fluid
                selection
                options={ausenceReasonsCompany.map(reason => ({ key: reason.id, text: reason.displayName, value: reason.id }))}
                onChange={(e, { value }) => {
                  const selected = ausenceReasonsCompany.find(reason => reason.id === value);
                  this.setState(prevState => ({
                    ausencePopupData: { ...prevState.ausencePopupData, selectedReason: selected, error: "", warning: "" }
                  }));
                }}
                value={ausencePopupData.selectedReason ? ausencePopupData.selectedReason.id : ""}
              />
            </Form.Field>)}
            {actionType == "remove" && (
            <Button onClick={() => {
              if (popupType === "quincena") {
                this.handleAddExistingAusenceReasonFortnight(groupId);
              } // else handle for construction similarly.
            }}>Quitar</Button>)}
            {actionType == "add" && (
            <Form.Field>
              <label>Crear nueva razón</label>
              <SUIInput
                placeholder="Nueva razón"
                value={ausencePopupData.newReasonName}
                onChange={(e, { value }) => this.handleAusenceNameChange(value)}
              />
              {ausencePopupData.error && <div style={{ color: 'red' }}>{ausencePopupData.error}</div>}
              {ausencePopupData.warning && <div style={{ color: 'orange' }}>{ausencePopupData.warning}</div>}
            </Form.Field>)
            }
            {actionType == "add" && 
            (<Button onClick={() => {
              if (popupType === "quincena") {
                this.handleAddNewAusenceReasonFortnight(groupId);
              }
            }}>Crear</Button>)}
          </Form>
        </Modal.Content>
      </Modal>
    );
  };

  // endregion


  // Absence Popup handlers (similar structure to category popup)
  handleAusenceNameChange = (value) => {
    let error = "";
    let warning = "";
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
      this.setState(prevState => ({
        ausencePopupData: { ...prevState.ausencePopupData, newReasonName: value, error: "", warning: "" }
      }));
      return;
    }
    const exists = this.state.ausenceReasonsCompany.find(reason => reason.name.trim().toLowerCase() === trimmed);
    if (exists) error = "La razón ya existe.";
    else {
      const similar = this.state.ausenceReasonsCompany.find(reason => {
        const existing = reason.name.trim().toLowerCase();
        let matchCount = 0;
        for (let i = 0; i < Math.min(existing.length, trimmed.length); i++) {
          if (existing[i] === trimmed[i]) matchCount++;
        }
        return matchCount / Math.max(existing.length, trimmed.length) >= 0.9;
      });
      if (similar) warning = "La razón es similar a una existente.";
    }
    this.setState(prevState => ({
      ausencePopupData: { ...prevState.ausencePopupData, newReasonName: value, error, warning }
    }));
  };

  render() {
    const { construction, groupFortnights } = this.state;    
    console.log("Props sent:", groupFortnights, groupFortnights[0].key);
    const details = {
      Lugar: 'Punta del Este',
      Quincena: this.props.fortnightNumber,
      Año: this.props.year,
     
    };
    return (
    <div>
        <Grid>
            <Grid.Row columns={2} verticalAlign="top" style={{ padding: "1em 0" }}>
              
              {/* Logo on the Left */}
              <Grid.Column width={4} textAlign="center">
               
              {/*<Label as='a' image>
                 <Image
                  src={companyLogo}
                  size="small"                  
                />
                  <span>Construcción:  <bold>{construction.id}</bold><br/>
                  Nombre: <bold>{construction.name}</bold><br/>
                  Año: <bold>{this.props.fortnightNumber}</bold><br/>
                  Quincena: <bold>{this.props.fortnightNumber}</bold></span>
                </Label> */}

              <Card fluid style= {{width: "330px" }}>
                <Card.Content style={{ display: 'flex', alignItems: 'center', backgroundColor: "#e0e1e2"}}>                  
                  <div>
                    <Card.Header style={{ marginBottom: '10px', fontSize:"1.2em", fontWeight:"bold", textAlign: "left" }}>Torres del este</Card.Header>
                    <List style={{ textAlign: 'left' }}>
                      {Object.entries(details).map(([field, value], index) => (
                        <List.Item key={index}>
                          <strong>{field}:</strong> {value}
                        </List.Item>
                      ))}
                    </List>
                  </div>
                </Card.Content>
              </Card>
              </Grid.Column>
              <Grid.Column width={12} textAlign='right'>
                <Button icon labelPosition="left" color="blue">
                  <Icon name="save" />
                  Guardar
                </Button>
                <Button icon labelPosition="left" color="orange">
                  <Icon name="send" />
                  Notificar Revision
                </Button>
              </Grid.Column>
             
              
            </Grid.Row>
            

        {groupFortnights.map(group => (

            <GroupFortnight
            key={group.id}
            // Pass down event handlers. For example:
            onSave={(data) => this.handleSave({ groupId: group.groupId, ...data })}
           
            onSaveRecords = {this.onSaveRecords}

            fortnightDays = {this.state.fortnightDays}

            // ausenceReasonsCompany = {this.state.ausenceReasonsCompany} 
            // hoursCategoriesCompany = {this.state.ausenceReasonsCompany} 

            // Pass down the rest of the group data
            //{...group}
            id  = {group.id} 
            name  = {group.name} 
            hoursCategoriesFortnight = {group.hoursCategoriesFortnight}
            hoursCategoriesConstruction = {group.hoursCategoriesConstruction} 
            ausenceReasonsFortnight = {group.ausenceReasonsFortnight} 
            ausenceReasonsConstruction = {group.ausenceReasonsConstruction} 
            employees = {group.employees}
            records = {group.records}   
            onAddRemoveHoursCategories= {this.onAddRemoveHoursCategories} 
            onAddRemoveAusenceReasons= {this.onAddRemoveAusenceReasons} 
            onAddRemoveEmployeesGroup = {this.onAddRemoveEmployeesGroup}
          
            onSetNonWorkableDay={this.handleSetNonWorkableDay}
            onSetLaborableDay={this.handleSetLaborableDay}
            handleOpenCategoryPopup={this.handleOpenCategoryPopup}
            handleOpenAusencePopup={this.handleOpenAusencePopup}
            handleOpenEmplyeesPopup = {this.handleOpenEmplyeesPopup}
          />
        ))}
        </Grid>
        {this.renderCategoryPopup()}
        {this.renderAusencePopup()}
        {this.renderEmployeesPopup()}
        </div>
    );
  }
}

export default Fortnight;
