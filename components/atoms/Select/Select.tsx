import React, {CSSProperties} from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import {Option} from 'react-select/src/filters'
import {
    ActionMeta,
    ValueType,
    InputActionMeta,
    GroupedOptionsType,
    OptionsType,
    Theme,
} from 'react-select'

import {colors, borderRadius} from 'styles'
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
    control: (styles: CSSProperties) => ({
        ...styles,
        height: 62,
        borderWidth: 2,
        borderColor: colors.SHADE_LIGHT,
        borderRadius: borderRadius.SECONDARY,
        cursor: 'pointer',
    }),
    option: (styles: CSSProperties, {isFocused}: any) => ({
        ...styles,
        backgroundColor: isFocused ? colors.PRIMARY_LIGHT : colors.WHITE,
        color: colors.BLACK,
        padding: '18px 20px',
        cursor: 'pointer',
    }),
    input: (styles: CSSProperties) => ({
        ...styles,
        paddingLeft: 20,
    }),
    placeholder: (styles: CSSProperties) => ({
        ...styles,
        paddingLeft: 20,
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (styles: CSSProperties, {isFocused}: any) => ({
        ...styles,
        paddingRight: 16,
        color: isFocused ? colors.PRIMARY : colors.MID_GRAY,
    }),
    menu: (styles: CSSProperties) => ({
        ...styles,
        borderRadius: borderRadius.SECONDARY,
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
        neutral30: colors.SHADE_LIGHT,
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

const SelectDefault = function<OptionType>({
    filterOptions,
    onChange,
    options,
    placeholder,
}: Props<OptionType>) {
    return (
        <NoSSR>
            <Select
                controlShouldRenderValue={false}
                onChange={onChange}
                options={options}
                filterOption={filterOptions}
                placeholder={placeholder}
                styles={styles}
                theme={theme}
            />
        </NoSSR>
    )
}

export {SelectCreatable, SelectDefault}
