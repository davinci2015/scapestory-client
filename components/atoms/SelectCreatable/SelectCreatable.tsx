import React, {CSSProperties} from 'react'
import CreatableSelect from 'react-select/creatable'
import {Option} from 'react-select/src/filters'
import {
    ActionMeta,
    ValueType,
    InputActionMeta,
    GroupedOptionsType,
    OptionsType,
    Theme,
} from 'react-select'

import {colors} from 'styles'
import {NoSSR} from 'components/core'

export interface Props<OptionType> {
    options: GroupedOptionsType<OptionType> | OptionsType<OptionType>
    onChange: (newValue: ValueType<OptionType>, actionMeta: ActionMeta) => void
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
    onCreateOption?: (inputValue: string) => void
    filterOptions?: (option: Option, inputValue: string) => boolean
    placeholder?: React.ReactNode
}

const styles = {
    option: (styles: CSSProperties, {isFocused}: any) => ({
        ...styles,
        backgroundColor: isFocused ? colors.PRIMARY_LIGHT : colors.WHITE,
    }),
}
const theme = (theme: Theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: colors.PRIMARY_LIGHT,
        primary: colors.PRIMARY,
        danger: colors.ERROR,
        neutral0: colors.WHITE,
        neutral10: colors.SHADE_EXTRA_LIGHT,
        neutral50: colors.MID_GRAY,
        neutral90: colors.DARK_GRAY,
    },
})

const SelectCreatable = function<OptionType>({
    filterOptions,
    onChange,
    onCreateOption,
    options,
    placeholder,
}: Props<OptionType>) {
    return (
        <NoSSR>
            <CreatableSelect
                controlShouldRenderValue={false}
                onChange={onChange}
                options={options}
                onCreateOption={onCreateOption}
                filterOption={filterOptions}
                placeholder={placeholder}
                styles={styles}
                theme={theme}
            />
        </NoSSR>
    )
}

export default SelectCreatable
