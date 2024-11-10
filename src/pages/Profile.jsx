import Button from '../components/Button';


const handleSubmit = () => {
  localStorage.removeItem('Profile');
  console.log(JSON.parse(localStorage.getItem('Profile')));

}


function Profile() {
  return (
    <div className='container min-h-[90vh]'>
      <Button
        buttonName="Excluir Perfil"
        onclick={handleSubmit}
      />
    </div>
  )
}

export default Profile;