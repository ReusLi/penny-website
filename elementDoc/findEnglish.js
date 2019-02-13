const aliasDataType = {
    "AlertType": "'success' | 'warning' | 'info' | 'error'",
    "SuggestionPlacement": "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'",
    "FetchSuggestions": "$funtion",
    "ElementUIComponentSize": "'large' | 'medium' | 'small' | 'mini'",
    "ButtonType": "'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'",
    "ButtonNativeType": "'button' | 'submit' | 'reset' | 'menu'",
    "object": "object",
    "CardSlots": "$slot",
    "CarouselIndicatorTrigger": "'hover' | 'click'",
    "CarouselIndicatorPosition": "'outside' | 'none'",
    "CarouselArrowVisibility": "'always' | 'hover' | 'never'",
    "CarouselType": "card",
    "CascaderOption[]": "$interface",
    "any[]": "$[]",
    "ExpandTrigger": "'click' | 'hover'",
    "ResponsiveColumn": "number",
    "CollapseItemSlots": "$interface",
    "ColorFormat": "'hsl' | 'hsv' | 'hex' | 'rgb'",
    "'horizontal' | 'vertical'": "'horizontal' | 'vertical'",
    "DatePickerType": "'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'dates'",
    "ElementUIHorizontalAlignment": "'left' | 'center' | 'right'",
    "DatePickerOptions": "$interface",
    "DialogSlots": "$interface",
    "DropdownMenuAlignment": "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'",
    "DropdownMenuTrigger": "'hover' | 'click'",
    "FormItemLabelPosition": "'left' | 'right' | 'top'",
    "InputNumberSize": "'large' | 'small'",
    "Number": "number",
    "InputType": "'text' | 'textarea'",
    "any": "any",
    "Resizability": "'none' | 'both' | 'horizontal' | 'vertical'",
    "MenuDisplayMode": "'horizontal' | 'vertical'",
    "MessageType": "'success' | 'warning' | 'info' | 'error'",
    "RegExp": "$interface",
    "MessageBoxInputValidator": "$interface",
    "MessageBoxCloseAction": "'confirm' | 'cancel' | 'close'",
    "PopoverTrigger": "'click' | 'focus' | 'hover' | 'manual'",
    "PopoverPlacement": "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'",
    "PopoverSlots": "$interface",
    "ProgressType": "'line' | 'circle'",
    "ProgressStatus": "'success' | 'exception' | 'text'",
    "RadioGroupSize": "'large' | 'small'",
    "HorizontalAlignment": "'start' | 'end' | 'center' | 'space-around' | 'space-between'",
    "VertialAlignment": "'top' | 'middle' | 'bottom'",
    "QueryChangeHandler": "$interface",
    "SliderTooltipFormat": "$interface",
    "StepStatus": "'wait' | 'process' | 'finish' | 'error' | 'success'",
    "StepRenderSlots": "$interface",
    "StepsDirection": "'vertical' | 'horizontal'",
    "TableColumnType": "'default' | 'selection' | 'index' | 'expand'",
    "SortOrders[]": "'ascending' | 'descending' | null",
    "TableColumnFilter[]": "$interface",
    "Boolean": "boolean",
    "object[]": "object",
    "String": "string",
    "DefaultSortOptions": "$interface",
    "TooltipEffect": "'dark' | 'light'",
    "TabType": "'card' | 'border-card'",
    "TabPosition": "'top' | 'right' | 'bottom' | 'left'",
    "TagType": "'primary' | 'gray' | 'success' | 'warning' | 'danger'",
    "TimePickerOptions": "$interface",
    "TimeSelectOptions": "$interface",
    "TransferData[]": "$interface",
    "TransferRenderContent": "$interface",
    "TransferFormat": "$interface",
    "TransferProps": "$interface",
    "D[]": "$interface",
    "TreeProps": "$interface",
    "K[]": "$interface",
    "FileListItem[]": "$interface",
    "ListType": "'text' | 'picture' | 'picture-card'"
}

let ENUM_FANYI = []

let enumList = []
Object.keys(aliasDataType).forEach(key => {
    const value = aliasDataType[key]

    if (value.indexOf('|') !== -1) {
        enumList = value.split('|')
            .map(item => item.replace(/'/g, '').split(' ').join(''))
            .map(item => {

                !ENUM_FANYI.includes(item)
                    ? ENUM_FANYI.push(item)
                    : null

                return {
                    id: item,
                    text: item
                }
            })

        aliasDataType[key] = enumList
    } else {
        aliasDataType[key] = 'nothing'
    }
})

debugger