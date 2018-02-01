<Modal
  offset={this.state.offset}
  open={this.state.open}
  modalDidOpen={() => console.log('modal did open')}
  modalDidClose={() => this.setState({open: false})}
  style={{}}>
  <View style={{paddingHorizontal:10,paddingVertical:15, }}>
    <Text style={styles.textCart}>Pesananmu sudah masuk keranjang</Text>
    <View style={{marginVertical:10}}>
      <Button
        containerStyle={globalStyles.ctaButton2}
        style={{fontSize: 14, color: '#fff', fontFamily:'Hind-SemiBold'}}
        onPress={() => this.setState({open: false})}
      >
        Lanjut ke Pembayaran
      </Button>
    </View>
    <View >
      <Button
        containerStyle={globalStyles.ctaButton3}
        style={{fontSize: 14, color: '#ff5f5f', fontFamily:'Hind',}}
        onPress={() => this.setState({open: false})}
      >
        Tambah Activity Lainnya
      </Button>
    </View>
    {/*<TouchableOpacity
      style={{margin: 5}}
      onPress={() => this.setState({open: false})}>
      <Text>Close modal</Text>
    </TouchableOpacity>*/}
  </View>
</Modal>


const styles = StyleSheet.create({
  textCart: {
    fontFamily: 'Hind', 
    color:'#454545', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
        //backgroundColor:'red'
      },
      android: {
        //marginTop:5
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});