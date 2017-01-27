Vue.http.headers.common['X-CSRF-TOKEN'] = $("#token").attr("value");

new Vue({
	el: '#manage-vue',
	data: {
		awal: 1,
		api_url: "http://localhost/rest/api/",
    	items: [],
    	item_detil: {id: 0, nama: '', satuan: ''},
    	disabel: true,
    },
    ready : function(){
  		this.getSemua();
  	},
  	methods : {
  		getSemua: function(){
        	this.$http.get(this.api_url+'barang/barang').then((r) => {
	        	this.$set('items', r.data);
        	});
        },
        editItem: function(item) {
        	this.$http.get(this.api_url+'barang/barang/id/'+item).then((r) => {
	        	this.item_detil.id = r.data.id;
	        	this.item_detil.nama = r.data.nama;
	        	this.item_detil.satuan = r.data.satuan;
	        	this.disabele(false);
        	});
        },
        hapusItem: function(item) {
        	if (confirm('Anda yakin..?')) {
	        	this.$http.delete(this.api_url+'barang/barang/id/'+item).then((r) => {
        			this.getVueItems();
	        	});
	        }
        },
        simpan: function() {
        	var input = this.item_detil;
        	this.$http.post(this.api_url+'barang/barang',input).then((r) => {
        		this.getVueItems();
        		this.item_detil.id = 0;
        		this.item_detil.nama = "";
        		this.item_detil.satuan = "";
        		this.disabele(true);
        	});
        },
        disabele: function(status) {
        	this.disabel = status;
        }
  	}
});
