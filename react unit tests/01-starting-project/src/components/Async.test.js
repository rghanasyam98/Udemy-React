import { render,screen } from "@testing-library/react";
import Async from "./Async";

describe('async component test',()=>{
    // test("render li items on async http request",async()=>{
    //     // Arrange
    //   render(<Async/>);

    // //   act
    // // ...nothing

    // //  assert
    // // async http involved aayath kond li render cheyyan delay undavum .so we cant use getAllByRole() that will Immediately look for li
    // // this will not immediately look li avaible or not .wait upto 2 seconds
    // const listItems=await screen.findAllByRole('listitem',{},{timeout:2000});
    // expect(listItems).not.toHaveLength(0);

    // })

    // sending unnecessary requests to the server will cause traffic
    // so no need to send requests to the server,we can just use mock function
    test("render li items on async http request",async()=>{
        // Arrange

        // overriding existing fetch fn with some dummy fn
        window.fetch=jest.fn();
        // passing sample response values
        window.fetch.mockResolvedValueOnce({
            json:()=>[{id:"p1",title:"some title"}]
        })
      render(<Async/>);

    //   act
    // ...nothing

    //  assert
    // async http involved aayath kond li render cheyyan delay undavum .so we cant use getAllByRole() that will Immediately look for li
    // this will not immediately look li avaible or not .wait upto 2 seconds
    const listItems=await screen.findAllByRole('listitem',{},{timeout:2000});
    expect(listItems).not.toHaveLength(0);

    })
})