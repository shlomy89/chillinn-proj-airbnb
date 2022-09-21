import '../../assets/styles/cmps/_reserve-button.scss'
import Swal from 'sweetalert2'

export const ReserveButton = () => {
    const openModal = () => {
        Swal.fire({
            title: 'Reserved!',
            text: 'Enjoy your vacation to the fullest. Take care! ',
            imageUrl:
                'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43161516/original/1acde0cf-3363-44d8-a707-59403ed74442.jpeg?im_w=720',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image'
        })
    }
    return (
        <div className='reserve-button' onClick={() => openModal()}>
            Reserve
        </div>
    )
}

// class Foo extends Component {
//   handleClick = () => {
//     console.log('Click happened')
//   }
//   render() {
//     return <button onClick={this.handleClick}>Click Me</button>;
//   }
// }
