import { Colors } from '@/constants/Colors'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
        <View style = {styles.userInfo}>
      <Image 
        source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }} 
        style={styles.userImg} 
        />
        <View style ={{gap: 3}}>
            <Text style = {styles.welcomeText}>Welcome!</Text>
            <Text style = {styles.userNameText}>Nick !</Text>
        </View>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    marginBottom: 20
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo:{
    flexDirection: 'row',
    alignItems : 'center',
    gap : 10
  },
  welcomeText:{
    fontSize : 12,
    color: Colors.darkGrey
  },
  userNameText:{
    fontSize : 14,
    fontWeight : '700',
    color: Colors.black
  }
})
