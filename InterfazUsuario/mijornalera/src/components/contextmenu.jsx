import React, { Component } from 'react';

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.state = { style: {} };
  }

  componentDidMount() {
    this.updatePosition();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.anchorRect !== this.props.anchorRect) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  updatePosition = () => {
    const { anchorRect } = this.props;
    const menuNode = this.menuRef.current;
    if (!anchorRect || !menuNode) return;
    const menuRect = menuNode.getBoundingClientRect();
    let left, top;
    if (anchorRect.right + menuRect.width <= window.innerWidth) {
      left = anchorRect.left;
    } else {
      left = anchorRect.left - menuRect.width;
    }
    if (anchorRect.bottom + menuRect.height <= window.innerHeight) {
      top = anchorRect.bottom;
    } else {
      top = anchorRect.top - menuRect.height;
    }
    this.setState({ style: { left, top, zIndex: 1000, position: 'fixed' } });
  };

  handleClickOutside = (e) => {
    if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  getMenuItems = () => {
    const { type, employee, day, hoursCategory, ausence, value } = this.props;
    switch (type) {
      case 'fortnightDayHeader':
        return [
          {
            label: "Mostrar Desde Día (Filtro)",
            action: () => this.props.handleDateRangeChange({ from: day.day })
            
          },
          {
            label: "Mostrar Hasta Día (Filtro)",
            action: () => this.props.handleDateRangeChange({ to: day.day })
          },
          {
            label: "Mostrar Solo Día (Filtro)",
            action: () => this.props.handleDateRangeChange({ from: day.day , to: day.day})      
          },
          {
            label: "Fijar No Laborable",
            action: () => {
              if (this.props.onSetNonWorkableDay) {
                this.props.onSetNonWorkableDay(day);
              }
            },
          },
          {
            label: "Fijar Laborable",
            action: () => {
              if (this.props.onSetLaborableDay) {
                this.props.onSetLaborableDay(day);
              }
            },
          },
        ];
      case 'hoursCategoryHeader':
        return [
          {
            label: "Quitar Categoria Quincena",
            action: () => {
              if (this.props.onAddRemoveHoursCategoriesFortnight) {
                this.props.onAddRemoveHoursCategoriesFortnight(hoursCategory, "remove");
              }
            }
          },
          {
            label: "Quitar Categoria Construction",
            action: () => {
              if (this.props.onAddRemoveHoursCategoriesConstruction) {
                this.props.onAddRemoveHoursCategoriesConstruction(hoursCategory, "remove");
              }
            }
          },
          {
            label: "Agregar Categoria Quincena",
            action: () => {
              if (this.props.handleOpenCategoryPopup) {
                this.props.handleOpenCategoryPopup("quincena");
              }
            }
          },
          {
            label: "Agregar Categoria Construction",
            action: () => {
              if (this.props.handleOpenCategoryPopup) {
                this.props.handleOpenCategoryPopup("obra");
              }
            }
          },
        ];
      case 'ausenceHeader':
        return [
          {
            label: "Quitar Ausencia Fortnight",
            action: () => {
              if (this.props.handleOpenAusencePopup) {
                this.props.handleOpenAusencePopup("quincena", "remove");
              }
            }
          },
          {
            label: "Quitar Ausencia Construction",
            action: () => {
              if (this.props.handleOpenAusencePopup) {
                this.props.handleOpenAusencePopup("obra", "remove");
              }
            }
          },
          {
            label: "Agregar Ausencia Fortnight",
            action: () => {
              if (this.props.handleOpenAusencePopup) {
                this.props.handleOpenAusencePopup("quincena", "add");
              }
            }
          },
          {
            label: "Agregar Ausencia Construction",
            action: () => {
              if (this.props.handleOpenAusencePopup) {
                this.props.handleOpenAusencePopup("obra", "add");
              }
            }
          },
        ];
      case 'employeeName':
        return [
          { label: "Mostrar Empleado Solo (Filtro)", action: () => this.props.onEmployeeFilterChange(null, employee, "only") },
          { label: "Ocultar Empleado (Filtro)", action: () =>  this.props.onEmployeeFilterChange(null, employee, "remove") },
          { label: "Quitar Empleado Grupo", action: () => this.props.onAddRemoveEmployeesGroup(employee, "remove") },
          { label: "Agregar Empleado Grupo", action: () =>this.props.handleOpenEmplyeesPopup() },
        ];
      case 'ausenceCell':
        return [
          {
            label: "Copiar Ausencia Empleados Día",
            action: () => console.log("Copiar Ausencia Empleados Día", { type, employee, day }),
          },
          {
            label: "Copiar Ausencia Empleado Quincena",
            action: () => console.log("Copiar Ausencia Empleado Quincena", { type, employee, day }),
          },
        ];
      case 'hoursCell':
        return [
          {
            label: "Copiar Horas Empleados Día",
            action: () =>  this.props.onCopyEmployeesCategoriesHours( "employeesDay", type, employee.id, day.day, hoursCategory.id, value)
          },
          {
            label: "Copiar Horas Empleado Quincena",
            action: () => this.props.onCopyEmployeesCategoriesHours( "employeeDays", type, employee.id, day.day, hoursCategory.id, value),
          },
        ];
      default:
        return [];
    }
  };

  render() {
    const { style } = this.state;
    const items = this.getMenuItems();
    return (
      <div
        className="groupConstructionMenuContext"
        ref={this.menuRef}
        style={style}
        onMouseEnter={this.props.onMenuMouseEnter}
        onMouseLeave={this.props.onMenuMouseLeave}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            style={{ padding: '4px 8px', cursor: 'pointer' }}
            onClick={() => {
              console.log("Menu item selected:", {
                label: item.label,
                type: this.props.type,
                employee: this.props.employee,
                day: this.props.day,
                hoursCategory: this.props.hoursCategory,
                value: this.props.value,
              });
              item.action();
              // if (this.props.onAction) {
              //   this.props.onAction({
              //     type: this.props.type,
              //     employee: this.props.employee,
              //     day: this.props.day,
              //     hoursCategory: this.props.hoursCategory,
              //     value: this.props.value,
              //   });
              // }
              if (this.props.onClose) {
                this.props.onClose();
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }
}

export default ContextMenu;
