import React,  { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import styles from "./ThongKeDoanhThu.module.css"
import DataTable from "react-data-table-component"
import DieuHuong from "../../../components/DieuHuong/Dieuhuong"
import { useNavigate } from "react-router-dom";
import ChiTietSanPham from './ChiTietSanPham';
import moment from 'moment';
const ThongKeDoanhThu=()=> {
    const navigate = useNavigate();
    const [isToggledd, setisToggledd] =useState(false);
    const [Maid,setMaid] = useState("");
    const [Data3, setData3] = useState([]);
    const [ViewShowTL, SetViewShowTL] = useState(false)
    const [Manghoadon, setManghoadon]= useState([])
    const [Dong, setDong] = useState(false);
    const [TimKiem, setTimKiem] = useState("");
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    var Tenchinhanh= localStorage.getItem("TenChiNhanh");
    console.log("chinhanh",Tenchinhanh)
    var ChiNhanh=Tenchinhanh;


    const [Mangdoanhthu, setMangdoanhthu]= useState([]);
    const [MangSum, setMangSum]= useState([]);


    var Tenchinhanh= localStorage.getItem("TenChiNhanh");
    console.log("chinhanh",Tenchinhanh)
    var ChiNhanh=Tenchinhanh;
   

    let SLCHINHANH = localStorage.getItem('SLCHINHANH');
    console.log('trang doan thu hin sl chi nhan', SLCHINHANH);

      let j=[1,2,3];
 console.log("trang doan thu nhat", j.length)
  let soluonghoadonn=0;
  let Tongthunhap=0;
  let Tongtongdoanhthu=0;
  const [money,setmoney] = useState("");
  
  console.log("trang doan thu nhat 1", Manghoadon.length)




      const Hamhienthidoanthu= ()=>{
        console.log("da chay len dc");

        // Tongthunhap=0;
        // for(let i=1; i<= Manghoadon; i++){
            
        //     Tongthunhap= Tongthunhap+ Manghoadon[i].Gia;
           
        //     console.log("da vao dc vong for chi tiet ",)
  
                
                

        // }
 
        // console.log("da vao dc vong for chi tiet11111  ", Tongtongdoanhthu)
        // setmoney(Tongtongdoanhthu)
       
  
    }
    
    const handleViewShowTL = (item) => { 
        console.log("vao dc rooif", item)
        let a=item;
        for(var j=0;j<a.length;j++){
            let b=a[j];
            b.map((item) => {
                let product={
                    TenVatTu: item.TenVatTu,
                    _id: item._id,
                    SoLuong: item.SoLuong,
                    Gia: item.Gia

                }
                Data3.push(product);
                console.log("Ten vt",item._id);
            })
        }
            SetViewShowTL(true);

    }
    
      const GethoadonChiNhanh = async () => {

        const url = `http://localhost:5001/HoaDon/c/${Tenchinhanh}`
        axios.get(url)
                  .then(response => {
                      const result = response.data;
                      const { status, message, data } = result;
                      if (status !== 'SUCCESS') {
                          alert(message, status)
                      }
                      else {
                        setManghoadon(data)
    
                        
                          console.log("in hoa don",data)
                            let tonglai=0;
                          for(let i=0;i< data.length; i++){
                            tonglai = tonglai + data[i].Gia;
                            setmoney(tonglai)
                          }
                      }
                  })
                  .catch(err => {
                      console.log(err)
                  })
                }

      const handlePostShoww=() => {
        GethoadonChiNhanh();
       Hamhienthidoanthu();
   }


   const setDon =(item) =>{
    Data3.length=0;
    setDong(item);
   }


   let NB 
   const columns = [
    {
        name: <div style={{fontSize:"18px"}}>Ngày Bán</div>,
      selector: (row) => NB= moment(row.NgayBan).format('DD/MM/YYYY'),
     
    },
    {
      name:<div style={{fontSize:"18px"}}>Số Lượng</div>,
      selector: (row) => row.SanPham[0].length,
    },
    {
        name:<div style={{fontSize:"18px"}}>Tiền</div>,
        selector: (row) => row.Gia,
      
    },
    {
      name:<div style={{fontSize:"18px"}}>Action</div>,
      cell: (row) =>{
        return(
          <>
<Button size='sm' variant='primary' onClick={() => { handleViewShowTL(row.SanPham); setMaid(row._id); setDong(true)}}>Click</Button>,


</>
        )
      }
      
      
  },


  ]

   useEffect(() => {
           
    GethoadonChiNhanh();
   
    // Getallchitiethoadon();
}, [])

function search(rows){
  // console.log("sad", rows.NgayBan)
  console.log("sad1", TimKiem)
  return rows.filter(row => row.NgayBan.toLowerCase().indexOf(TimKiem)> -1)
  
}

console.log("data3",Data3);
const Hovernut = ()=>{
    setisToggledd(true);
  }
  const TatHovernut = ()=>{
    setisToggledd(false);
  }
      var Xep=true;
  return (

    <div>
      <nav>
      <div className="nav_box">
      
      {/* {Xep &&<button style={{position:'relative',right:"120px"}}  onClick={() => TatHovernut()}><i style={{color:"Azure"}} class="fa fa-arrow-circle-left"></i></button>}
      {Xep &&<button style={{position:'relative',right:"240px"}}  onClick={() => Hovernut()}><i style={{color:"Azure"}} class="fa fa-arrow-circle-right"></i></button>} */}
      <h1 style={{color:"Azure",position:"relative",left:"150px"}} > <b><i>Chào Mừng Đến Chi Nhánh: {Tenchinhanh}</i></b> </h1>
      <div className={styles.fixDieuHuong}>
      {Xep &&
      <section>
      {isToggledd && <DieuHuong/>}
      </section>}
      </div>
      </div>
     
    </nav>

    <div>
    <div className='container'>
      <div className='row'>
        <div className='col'></div>
        <div className='col'></div>
        <div className='col' style={{position:"relative" , top:"30px",color:"red"}}><h5><b><i>Tổng Doanh Thu:{money}VND</i></b></h5></div>
      </div>
    </div> 
    <div className={styles.ThongKeDoanhThu}>
    <div className='row'>
                <div className='table-responsive' >
                    <div style={{cursor: "pointer"}} onClick={() => {handlePostShoww() }} >
                <h5 style={{color:"#ff2424"}}    ><b><i   >Bảng Doanh Thu:</i></b>
                <input  style={{border:"1px solid",borderRadius: '5px!important',float:"right"}} placeholder="Tìm Kiếm" value={TimKiem} onChange={(a)=> setTimKiem(a.target.value)} ></input>
                </h5>
                </div>
          
                    <table className='table table-striped table-hover table-bordered' style={{border:"solid 1px"}}>                      
                        {/* <thead >
                            <tr style={{backgroundColor:"#ffff94"}}>
                      
                                
                                <th>Ngày Bán</th>
                                <th>Số Lượng</th>
                                <th>Tiền</th>
                                
                            </tr>
                        </thead> */}

                        <DataTable
                             
                            columns={columns}
                            data={search(Manghoadon)}
                            progressPending={loading}
                            fixedHeader
                            fixedHeaderScrollHeight='400px'
                            highlightOnHover
                            pagination
                            
                            />

                        {/* <tbody>
                            {Manghoadon.map((item) =>
                                <tr key={item._id}>
                                   
                                    <td>{item.NgayBan}</td>
                                    <td>{item.SanPham[0].length}</td>
                                    <td>{item.Gia}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShowTL(item.SanPham); setMaid(item._id); setDong(true)}}>Click</Button>
                                      
                                        </td>
                                  
                                   
                                </tr>
                            )}
                        </tbody> */}
                    </table>



                    
                </div>
            </div>
        </div>  

    </div>
    {Dong && <ChiTietSanPham Data3={Data3} closemodal={setDon}/>}
    </div>
  );
}

export default ThongKeDoanhThu;
