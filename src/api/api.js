export function getData(root, url, params) {
    root.service.get(url + '/count')
    .then(res => {
      res.status === 200 ? root.total = res.data : root.total = 0  
      root.service.get(url, {params: params})
      .then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            item.completion = (item.completedNumber / (item.completedNumber + item.uncompletedNumber)*100+'%')
          })
          root.tableData = [...res.data]
        }
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.error(err)
    })
}

/* 
  要记得写备注
*/
export function changeInfo(root, method, url, mess, form, callback) {
  let _url = ''
  method === 'post' ? _url = url : _url = url + '/' + root.form.id
  if (method === 'patch') {
    delete root.form.createdDate
    delete root.form.lastModifiedDate
  }
  root.service[method](_url, root.form)
  .then(res => {
    if (res.status === 201 || res.status === 200) {
      root.dialogFormVisible = false
      root.$refs[form].resetFields()
      root.$message({message: mess, type: 'success'})
      callback(root, url)
    }
  })
  .catch(err => {
    console.error(err)
  })
}

export function remove(root, cont, title, btn, url, mess, id, callback ) {
  root.$alert(cont, title, {
    confirmButtonText: btn,
    callback: () => {
      root.service.delete(url + '/' + id)
      .then(res => {
        if (res.status === 204) {
          root.$message({message: mess, type: 'success'})
          callback(root, url)
        }
      })
      .catch(err => {
        console.error(err)
      })
    }
  })
}