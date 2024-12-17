import CustomText from "@/src/utils/CustomText";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

type TextFieldProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (value: string) => void;
    keyboardType?: TextInputProps["keyboardType"];
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
};

const TextField: React.FC<TextFieldProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    secureTextEntry = false,
    placeholderTextColor = "grey",
}) => {
    return (
        <View>
            <CustomText style={{ fontFamily: "Montserrat-Bold", fontSize: 18 }}>
              {label}
            </CustomText>
            <View className="mt-2">
                <TextInput 
                    // autoCapitalize="none"
                    className="bg-cardBackground tracking-widest text-lg text-black border rounded-lg border-[#909090]"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    )
}

export default TextField;