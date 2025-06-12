import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown, Input, Table, Grid, Form, Modal, Dropdown as SUIDropdown, Input as SUIInput, Header } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ContextMenu from './contextmenu'; // Adjust path if needed

class GroupFortnight extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      currentDay: 1,      
      selectedEmployees: [],
      dateRange: { from: '', to: '' },
            
      contextMenuData: { show: false },
      contextMenuHovered: false,      
    };

    this.tableContainerRef = React.createRef();
    this.dayRefs = {};
    this.contextMenuRefs = {};
  }

  componentDidMount() {
    this.setState ({selectedEmployees: this.props.employees})
    // this.setState({ constructionName: 'Construcción Ejemplo' }, () => {
    //   const days = this.generateFortnightDays();
    //   this.setState({ fortnightDays: days }, this.scrollToCurrentDay);
    // });
  }


  componentDidUpdate(prevProps) {
    // If the parent's employees or filter criteria have changed,
    // recalculate the filteredEmployees state.
    if (
      prevProps.employees !== this.props.employees      
    ) {
      this.setState ({selectedEmployees: this.props.employees})
    }
  }
  


//   reorderList(list, startIndex, endIndex) {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   }

//   onDragEnd = (result) => {
//     const { source, destination, type } = result;
//     if (!destination) return;
//     if (type === 'EMPLOYEE') {
//       const newEmployees = this.reorderList(this.state.employees, source.index, destination.index);
//       newEmployees.forEach((emp, index) => (emp.order = index));
//       this.setState({ employees: newEmployees });
//     } else if (type === 'HOURSCATEGORY') {
//       const newCategories = this.reorderList(this.state.hoursCategoriesFortnight, source.index, destination.index);
//       newCategories.forEach((cat, index) => (cat.order = index));
//       this.setState({ hoursCategoriesFortnight: newCategories });
//     }
//   };

  handleSave = () => {
    console.log('Datos a guardar:', this.state.records);
  };

  handleEmployeeFilterChange = (e, value, actionType) => {
    if (actionType == "add")
      this.setState((prevState) => ({
        selectedEmployees: { ...prevState.selectedEmployees, value },
      }));
    else if (actionType == "remove")      
      this.setState((prevState) => ({
        selectedEmployees: prevState.selectedEmployees.filter(e => e.id !== value.id) ,
      }));

    else{ // "only"
      this.setState({
        selectedEmployees: [value] 
    });
    } 
  };

  handleDateRangeChange = (updates) => {
    this.setState((prevState) => ({
      dateRange: { ...prevState.dateRange, ...updates },
    }));
  };
  
  
  

  handleAbsenceReasonChange = (employeeId, day, value) => {
    const records = { ...this.props.records };
    if (!records[employeeId]) records[employeeId] = {};
    if (!records[employeeId][day]) records[employeeId][day] = { absenceReason: '', hours: {} };
    records[employeeId][day].absenceReason = value;
    if (value) records[employeeId][day].hours = {};

    this.props.onSaveRecords(records, this.props.id)
    //this.setState({ records });
  };

  handleHoursChange = (employeeId, day, categoryId, value) => {
    const records = { ...this.props.records };
    if (!records[employeeId]) records[employeeId] = {};
    if (!records[employeeId][day]) records[employeeId][day] = { absenceReason: '', hours: {} };
    records[employeeId][day].hours[categoryId] = value;
    this.props.onSaveRecords(records, this.props.id)
    //this.setState({ records });
  };

  onCopyEmployeesCategoriesHours = (actionType, employeesList, employeeId, day, categoryId, value) => {
    const records = { ...this.props.records };
    if(actionType == "employeesDay"){
      for (const emp of employeesList) {
        const empId = emp.id
        if (!records[empId]) {
          records[empId] = {};
        }

        if (!records[empId][day]) {
          records[empId][day] = { absenceReason: '', hours: {} };
        }
        records[empId][day].hours[categoryId] = value;
      }
    }
    else { // actionType == "employeeDays"
      if (records[employeeId]) {
        // Iterate over each day key for the employee
        for (const day of this.props.fortnightDays) {
          const dayId = day.day
          if (!records[employeeId][dayId]) {
            records[employeeId][dayId] = { absenceReason: '', hours: {} };

          // Set the value for the given categoryId
          records[employeeId][dayId].hours[categoryId] = value;
        }
      }
    }
  }
   
    


    this.props.onSaveRecords(records, this.props.id)
    //this.setState({ records });
  };

  getRecord(records, employee, day, cat) {
    const rec = records[employee.id] && records[employee.id][day.day];
    if (rec && rec.absenceReason) return "";
    return (rec && rec.hours[cat.id]) || "";
  }

  handleDottedButtonClick = (data, refKey) => {
    const refEl = this.contextMenuRefs[refKey];
    if (refEl && refEl.getBoundingClientRect) {
      const anchorRect = refEl.getBoundingClientRect();
      this.setState({
        contextMenuData: {
          show: true,
          type: data.type,
          employee: data.employee,
          day: data.day,
          hoursCategory: data.hoursCategory,
          ausenceReason: data.ausenceReason,
          value: data.value,
          anchorRect: anchorRect,
        },
      });
    } else {
      console.error('Reference element not found or does not support getBoundingClientRect');
    }
  };

  handleMenuMouseEnter = () => { this.setState({ contextMenuHovered: true }); };
  handleMenuMouseLeave = () => { this.setState({ contextMenuHovered: false }, () => { this.closeContextMenuIfNotHovered(); }); };
  handleDottedButtonMouseLeave = () => {
    setTimeout(() => { if (!this.state.contextMenuHovered) this.setState({ contextMenuData: { show: false } }); }, 100);
  };
  closeContextMenuIfNotHovered = () => { if (!this.state.contextMenuHovered) this.setState({ contextMenuData: { show: false } }); };

  handleContextMenuAction = (params) => {
    console.log("Parent received context menu action:", params);
    // Additional behavior can be added here.
  };





 

  handleDayDecrement = () => {
    const { currentDay } = this.state;
    if (currentDay > 1) this.setState({ currentDay: currentDay - 1 }, this.scrollToCurrentDay);
  };

  handleDayIncrement = () => {
    const { currentDay } = this.state;
    if (currentDay < 15) this.setState({ currentDay: currentDay + 1 }, this.scrollToCurrentDay);
  };

  scrollToCurrentDay = () => {
    const { currentDay } = this.state;
    if (this.dayRefs[currentDay] && this.tableContainerRef.current) {
      this.dayRefs[currentDay].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  handleScroll = () => {
    const container = this.tableContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let bestDay = this.state.currentDay;
    let minDiff = Infinity;
    Object.entries(this.dayRefs).forEach(([day, element]) => {
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.left + elementRect.width / 2;
        const diff = Math.abs(elementCenter - containerCenter);
        if (diff < minDiff) {
          minDiff = diff;
          bestDay = parseInt(day, 10);
        }
      }
    });
    if (bestDay !== this.state.currentDay) this.setState({ currentDay: bestDay });
  };

  render() {
    const {
      employees,
      ausenceReasonsFortnight,
      hoursCategoriesFortnight,
      records,      
      fortnightDays,
    } = this.props;
    
    const {
      selectedEmployees,
        dateRange,
        currentDay,
        contextMenuData
    } = this.state;

    const sortedEmployees = [...employees].sort((a, b) => a.order - b.order);
    const sortedHoursCategoriesFortnight = [...hoursCategoriesFortnight].sort((a, b) => a.order - b.order);

    const fromDay = parseInt(dateRange.from) || 1;
    const toDay = parseInt(dateRange.to) || 15;
    const filteredFortnightDays = fortnightDays.filter(day => day.day >= fromDay && day.day <= toDay);

    const selectedEmployeeIds = selectedEmployees.map(emp => emp.id);
    

    const filteredEmployees = selectedEmployees.length > 0
      ? sortedEmployees.filter(emp => selectedEmployeeIds.includes(emp.id))
      : sortedEmployees;

    const ausenceOptions = ausenceReasonsFortnight.map(reason => ({
      key: reason.id,
      text: reason.displayName,
      value: reason.id,
    }));

    const employeeOptions = sortedEmployees.map(emp => ({
      key: emp.id,
      text: emp.name,
      value: emp.id,
    }));

    const colCount = hoursCategoriesFortnight.length + 1
    const colCountLength = colCount* 100;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div  className="fortnightGridContainer">
          <style>{`
            .cell-hover-container { position: relative; display: inline-block; width: 100%; }
            .hover-button { display: none !important; position: absolute; top: 50%; right: 4px; transform: translateY(-50%); z-index: 10; }
            .cell-hover-container:hover .hover-button { display: block !important; }
            .fixed-column { position: sticky; background: #fff; }
            .fixed-id { left: 40px; z-index: 4; min-width: 80px; }
            .fixed-name { left: 120px; z-index: 4; min-width: 150px; }
            th.fixed-column { z-index: 5; }
            .drag-handle-cell { width: 40px; text-align: center; vertical-align: middle; cursor: grab; background: #f4f4f4; }
            .menu-item:hover { background-color: #ddd; }
            .ui.compact.table td.day-cell, .ui.compact.table td.day-cell.weekendColumn, .ui.compact.table td.day-cell.nonWorkableColumn {padding:0;}
            .ui.compact.table td.day-cell{padding:0;}
          `}</style>

          <Grid>
            <Grid.Row columns={3} verticalAlign="middle">            
              <Grid.Column width={6}>
                {/* <Form.Field>
                  <label>Filtrar por empleado:</label>
                  <Dropdown placeholder="Seleccione empleado" fluid selection clearable options={employeeOptions}
                    onChange={this.handleEmployeeFilterChange} value={selectedEmployee} />
                </Form.Field> */}
              </Grid.Column>
              
            </Grid.Row>
            {/* <Grid.Row columns={2}>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Desde (día de quincena):</label>
                  <Input placeholder="Desde" value={dateRange.from}
                    onChange={(e) => this.handleDateRangeChange('from', e.target.value)} />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Hasta (día de quincena):</label>
                  <Input placeholder="Hasta" value={dateRange.to}
                    onChange={(e) => this.handleDateRangeChange('to', e.target.value)} />
                </Form.Field>
              </Grid.Column>
            </Grid.Row> */}
          </Grid>

          {/* <div style={{ margin: '10px 0', padding: '8px', border: '1px solid #eee' }}>
            <strong>Reorder Hours Categories:</strong>
          </div> */}
           <Header as="h3" textAlign="left">
                  {this.props.name}
            </Header>

          <div style={{ marginBottom: '10px', textAlign: "left" }}>
            <Button onClick={this.handleDayDecrement}>dia -</Button>
            <Button onClick={this.handleDayIncrement}>dia +</Button>
            {/* <span style={{ marginLeft: '10px' }}>Día actual: {currentDay}</span> */}
          </div>

          <div ref={this.tableContainerRef} onScroll={this.handleScroll} style={{ overflowX: 'auto' }}>
            <Table celled structured compact clipboard style={{ tableLayout: 'fixed' }} >
              <Table.Header>
                <Table.Row as="tr">
                  <Table.HeaderCell as="th" className="fixed-column fixed-sort" style={{ width: '50px' }}></Table.HeaderCell>
                  <Table.HeaderCell as="th" className="fixed-column fixed-id" style={{ width: '50px' }}></Table.HeaderCell>
                  <Table.HeaderCell as="th" className="fixed-column fixed-name" style={{ width: '200px' }}>
                    <div className="cell-hover-container">
                      
                      <div ref={(el) => (this.contextMenuRefs[`header-employeeName`] = el)}
                        className="divGroupConstructionMenuContextButton">
                        <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                          onClick={() => this.handleDottedButtonClick({ type: 'employeeNameHeader' }, `header-employeeName`)} />
                      </div>
                    </div>
                  </Table.HeaderCell>
                  {filteredFortnightDays.map((day) => (
                    <Table.HeaderCell key={day.day} as="th" colSpan={sortedHoursCategoriesFortnight.length + 1} textAlign="center"                    
                      className={`day-header-cell ${day.nonWorkable ? 'nonWorkableColumn' : ''} ${day.weekend ? 'weekendColumn' : ''}`}
                      style={{ width: colCountLength + 'px' }}>
                      <div className="cell-hover-container" ref={(el) => { if (el) this.dayRefs[day.day] = el; }}>
                        Día {day.day} - Fecha: {day.date}
                        <div ref={(el) => (this.contextMenuRefs[`header-day-${day.day}`] = el)}
                          className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                          <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                            onClick={() => this.handleDottedButtonClick({ type: 'fortnightDayHeader', day: day, date: day.date }, `header-day-${day.day}`)} />
                        </div>
                      </div>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
                <Table.Row as="tr">
                  <Table.HeaderCell as="th" className="fixed-column fixed-sort" ></Table.HeaderCell>
                  <Table.HeaderCell as="th" className="fixed-column fixed-id">ID</Table.HeaderCell>
                  <Table.HeaderCell as="th" className="fixed-column fixed-name">Empleado</Table.HeaderCell>
                  {filteredFortnightDays.map((day) => (
                    <React.Fragment key={day.day}>
                      <Table.HeaderCell as="th" className={`day-header-cell ${day.nonWorkable ? 'nonWorkableColumn' : ''} ${day.weekend ? 'weekendColumn' : ''} ausence`}
                       >
                        <div className="cell-hover-container">
                          Ausencia
                          <div ref={(el) => (this.contextMenuRefs[`header-ausence-${day.day}`] = el)}
                            className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                            <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                              onClick={() => this.handleDottedButtonClick({ type: 'ausenceHeader', day: day }, `header-ausence-${day.day}`)} />
                          </div>
                        </div>
                      </Table.HeaderCell>
                      {sortedHoursCategoriesFortnight.map((cat) => (
                        <Table.HeaderCell as="th" key={cat.id} className={`day-header-cell ${day.nonWorkable ? 'nonWorkableColumn' : ''} ${day.weekend ? 'weekendColumn' : ''}`}
                        style={{ width: '100px' }}>
                          <div className="cell-hover-container">
                            {cat.name}
                            <div ref={(el) => (this.contextMenuRefs[`header-hours-${day.day}-${cat.id}`] = el)}
                              className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                              <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                                onClick={() => this.handleDottedButtonClick({ type: 'hoursCategoryHeader', day: day, hoursCategory: cat }, `header-hours-${day.day}-${cat.id}`)} />
                            </div>
                          </div>
                        </Table.HeaderCell>
                      ))}
                    </React.Fragment>
                  ))}
                </Table.Row>
              </Table.Header>
              <Droppable droppableId="employeeRows" type="EMPLOYEE">
                {(provided) => (
                  <Table.Body as="tbody" ref={provided.innerRef} {...provided.droppableProps}>
                    {filteredEmployees.map((employee, index) => (
                      <Draggable key={`employee-${employee.id}`} draggableId={`employee-${employee.id}`} index={index}>
                        {(providedDrag) => (
                          <Table.Row as="tr" ref={providedDrag.innerRef} {...providedDrag.draggableProps}>
                            <Table.Cell as="td" className="drag-handle-cell" {...providedDrag.dragHandleProps}>
                              <i className="bars icon"></i>
                            </Table.Cell>
                            <Table.Cell as="td" className="fixed-column fixed-id">
                              {employee.id}
                            </Table.Cell>
                            <Table.Cell as="td" className="fixed-column fixed-name">
                              <div className="cell-hover-container">
                                {employee.name}
                                <div ref={(el) => (this.contextMenuRefs[`employeeName-${employee.id}`] = el)}
                                  className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                                  <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                                    onClick={() => this.handleDottedButtonClick({ type: 'employeeName', employee: employee }, `employeeName-${employee.id}`)} />
                                </div>
                              </div>
                            </Table.Cell>
                            {filteredFortnightDays.map((day) => (
                              <React.Fragment key={day.day}>
                                <Table.Cell as="td" className={`day-cell ${day.nonWorkable ? 'nonWorkableColumn' : ''} ${day.weekend ? 'weekendColumn' : ''}`}>
                                  <div className="cell-hover-container">
                                    <Dropdown placeholder="Ausencia" fluid selection clearable compact options={ausenceOptions} className='dropdownAbsenceGrid'
                                      onChange={(e, { value }) => this.handleAbsenceReasonChange(employee.id, day.day, value)}
                                      value={(records[employee.id] && records[employee.id][day.day] && records[employee.id][day.day].absenceReason) || null} />
                                    <div ref={(el) => (this.contextMenuRefs[`ausence-${employee.id}-${day.day}`] = el)}
                                      className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                                      <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                                        onClick={() => this.handleDottedButtonClick({ type: 'ausenceCell', employee: employee, day: day }, `ausence-${employee.id}-${day.day}`)} />
                                    </div>
                                  </div>
                                </Table.Cell>
                                {sortedHoursCategoriesFortnight.map((cat) => (
                                  <Table.Cell as="td" key={cat.id} className={`day-cell ${day.nonWorkable ? 'nonWorkableColumn' : ''} ${day.weekend ? 'weekendColumn' : ''}`}>
                                    <div className="cell-hover-container">
                                      <Input type="number" placeholder="Horas" step="0.1" className='inputHoursCategoriesGrid'
                                        onChange={(e) => this.handleHoursChange(employee.id, day.day, cat.id, e.target.value)}
                                        value={this.getRecord(records, employee, day, cat)}
                                        disabled={!!(records[employee.id] && records[employee.id][day.day] && records[employee.id][day.day].absenceReason)} />
                                      <div ref={(el) => (this.contextMenuRefs[`hours-${employee.id}-${day.day}-${cat.id}`] = el)}
                                        className="divGroupConstructionMenuContextButton" onMouseLeave={this.handleDottedButtonMouseLeave}>
                                        <Button icon="ellipsis horizontal" size="mini" className="hover-button"
                                          onClick={() => this.handleDottedButtonClick(
                                            { type: 'hoursCell', employee: employee, day: day, hoursCategory: cat, value: this.getRecord(records, employee, day, cat) },
                                            `hours-${employee.id}-${day.day}-${cat.id}`
                                          )} />
                                      </div>
                                    </div>
                                  </Table.Cell>
                                ))}
                              </React.Fragment>
                            ))}
                          </Table.Row>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Table.Body>
                )}
              </Droppable>
            </Table>
          </div>

          {contextMenuData.show && (
            <ContextMenu
              anchorRect={contextMenuData.anchorRect}
              type={contextMenuData.type}
              employee={contextMenuData.employee}
              day={contextMenuData.day}
              hoursCategory={contextMenuData.hoursCategory}
              ausenceReason={contextMenuData.ausenceReason}
              value={contextMenuData.value}
              onClose={() => this.setState({ contextMenuData: { show: false } })}
              onMenuMouseEnter={this.handleMenuMouseEnter}
              onMenuMouseLeave={this.handleMenuMouseLeave}
              onAction={this.handleContextMenuAction}
              handleDateRangeChange={this.handleDateRangeChange}
              onSetNonWorkableDay={( day) => { this.props.onSetNonWorkableDay( day)}}
              onSetLaborableDay={( day) => { this.props.onSetLaborableDay( day)}}
              handleOpenCategoryPopup={(popupType) => this.props.handleOpenCategoryPopup(popupType, this.props.id)}
              handleOpenAusencePopup={(popupType) =>this.props.handleOpenAusencePopup(popupType, this.props.id)}
              handleOpenEmplyeesPopup={() =>this.props.handleOpenEmplyeesPopup(this.props.id)}
              onEmployeeFilterChange = {this.handleEmployeeFilterChange }
              onAddRemoveHoursCategoriesFortnight={(cat, actionType) => {
                this.props.onAddRemoveHoursCategories( actionType, cat, "fortnight", this.props.id)               
              }}
              onAddRemoveHoursCategoriesConstruction={(cat, actionType) => {
                this.props.onAddRemoveHoursCategories(actionType, cat, "construction", this.props.id)                
              }}
              onAddRemoveAusenceReasonsFortnight={(actionType) => {
                this.props.onAddRemoveAusenceReasons(actionType, "fortnight", this.props.id)                
              }}
              onAddRemoveAusenceReasonsConstruction={(actionType) => {
                this.props.onAddRemoveAusenceReasons(actionType, "construction", this.props.id)                
              }}

              onAddRemoveEmployeesGroup ={(emp, actionType) => {               
                this.props.onAddRemoveEmployeesGroup (this.props.id, emp, actionType)                
              }}
              onCopyEmployeesCategoriesHours = {( actionType, type, employeeId, day, categoryId, value) => {               
                this.onCopyEmployeesCategoriesHours(actionType, this.props.employees, employeeId, day, categoryId, value)            
              }}
              
             
              
            />
          )}          
        </div>
      </DragDropContext>
    );
  }
}

export default GroupFortnight;
