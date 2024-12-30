import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function PickerItem(props) {
    let coins = props.coins.map((item, index) => {
        return <Picker.Item value={item.key} key={index} label={item.key} />
    });

    return(
        <Picker selectedValue={ props.coinSelected } onValueChange={ (value) => props.onChange(value) }>
            { coins }
        </Picker>
    );
}