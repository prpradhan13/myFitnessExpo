import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({ children, style, ...props }) => {

  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#2A2A2A",
    fontWeight: 'normal',
  },
});
