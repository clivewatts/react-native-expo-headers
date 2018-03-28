# React Native Headers

## Nice looking headers for React Native

### Intro

Just a compilation of header components I have made since I started working on React Native :)

### Quick Start

```javascript
const { scrollY } = this.state;

{Platform.OS === "ios" ?
  <Header offset={scrollY} 
          title="Hello World!"
          color="#000000"
          backgroundColor="#E8E8EF"
          leftButton={{
            icon: <Ionicons name="ios-menu-outline" size={30} color="#F47983" />,
            onPress: () => console.log("Pressed the left button!")
          }}
          rightButton={{
            icon: <Ionicons name="ios-funnel-outline" size={30} color="#F47983" />,
            onPress: () => console.log("Pressed the right button!")
          }} /> : null}

{Platform.OS === "ios" ?
  <SimpleHeader title="Hello World!"
                color="#000000"
                backgroundColor="#E8E8EF"
                leftButton={{
                  icon: <Ionicons name="ios-menu-outline" size={30} color="#F47983" />,
                  onPress: () => console.log("Pressed the left button!")
                }}
                rightButton={{
                  icon: <Ionicons name="ios-funnel-outline" size={30} color="#F47983" />,
                  onPress: () => console.log("Pressed the right button!")
                }} /> : null}

{Platform.OS === 'android' ? 
  <Header offset={scrollY}
          title="Hello World!"
          color="#FFFFFF"
          backgroundColor="#F47983"
          image={{
            preview: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            uri: "http://potatoprank.com/wp-content/uploads/2017/06/Happy-Potato_1-600x372.jpg"
          }}
          leftButton={{ icon: <Ionicons name="md-menu" size={28} color="#FFFFFF" />, onPress: () => console.log('Menu') }}
          rightButtons={[{ icon: <Ionicons name="md-funnel" size={28} color="#FFFFFF" />, onPress: () => console.log("Filter"), showAsAction: 'ifRoom' },
                         { icon: <Ionicons name="md-share" size={28} color="#FFFFFF" />, onPress: () => console.log("Share!"), showAsAction: 'ifRoom' },
                         { icon: <Ionicons name="md-beer" size={28} color="#000000" />, title: 'Give the man a beer!', onPress: () => console.log('Sure! He will get his beer!'), showAsAction: 'never' },
                         { icon: <Ionicons name="md-bowtie" size={28} color="#000000" />, title: 'Bowtie?', onPress: () => console.log('Bowties are cool!'), showAsAction: 'never' }]} /> : null}

{Platform.OS === "android" ?
  <SimpleHeader title="Hello World!"
                color="#FFFFFF"
                backgroundColor="#F47983"
                leftButton={{ icon: <Ionicons name="md-menu" size={28} color="#FFFFFF" />, onPress: () => console.log('Menu') }}
                rightButtons={[{ icon: <Ionicons name="md-funnel" size={28} color="#FFFFFF" />, onPress: () => console.log("Filter"), showAsAction: 'ifRoom' },
                              { icon: <Ionicons name="md-share" size={28} color="#FFFFFF" />, onPress: () => console.log("Share!"), showAsAction: 'ifRoom' },
                              { icon: <Ionicons name="md-beer" size={24} color="#000000" />, title: 'Give the man a beer!', onPress: () => console.log('Sure! He will get his beer!'), showAsAction: 'never' },
                              { icon: <Ionicons name="md-bowtie" size={24} color="#000000" />, title: 'Bowtie?', onPress: () => console.log('Bowties are cool!'), showAsAction: 'never' }]} /> : null}
```

For `zIndex` is not supported on Android, always position Android headers below all the rest of the Component code in order for it to show on top of it all.
Also, remember all these are absolutely positioned, just in case.
