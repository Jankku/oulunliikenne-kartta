import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  about: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    paddingTop: 100,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 100,
    height: 200,
    marginBottom: 70,
    resizeMode: 'cover',
    width: 200,
  },
  pressable: {
    backgroundColor: 'rgb(121, 118, 130)',
    borderRadius: 8,
    height: 50,
    margin: 30,
    padding: 6,
    width: 130,
  },
  pressableText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 25,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,

    marginBottom: 200,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
});

export default styles;
