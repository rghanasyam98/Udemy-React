import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";


// collection of related tests into a test suite
describe("greeting component",()=>{
    test("render 'Hello world' test",()=>{
        // 3a policy
        
        // arrange
        render(<Greeting/>);
        
        // act
        // ...nothing
        
        // assert
        const helloworldComponent=screen.getByText("Hello world",{exact:false});
        expect(helloworldComponent).toBeInTheDocument();
        
        })

        test("renders 'good to see you' if button was not clicked ",()=>{
            // arrange
            render(<Greeting/>);

            // act
            // ...nothing

            // assert
            const outputElement=screen.getByText("good to see you",{exact:false});
            expect(outputElement).toBeInTheDocument();

        })

        test("renders 'changed' if button was clicked ",()=>{
            // arrange
            render(<Greeting/>);

            // act
            // virtual button click
            const btnElement=screen.getByRole('button');
            userEvent.click(btnElement);

            // assert
            const outputElement=screen.getByText("changed",{exact:false});
            expect(outputElement).toBeInTheDocument();

        })

        test("doesnt renders 'good to see you' if button was clicked",()=>{
            // arrange
            render(<Greeting/>);

            // act
            // virtual button click
            const btnElement=screen.getByRole('button');
            userEvent.click(btnElement);

            // assert
            const outputElement=screen.queryByText("good to see you",{exact:false});
            expect(outputElement).toBeNull();//expecting null here

        })

        test("renders 'some text' of the child componet Output",()=>{
            // arrange
            render(<Greeting/>);

            // act
            // ...nothing

            // assert
            // some text is actually rendered by <Output> not directly by <Greeting>
            const outputElement=screen.getByText("some text",{exact:false});
            expect(outputElement).toBeInTheDocument();

        })


})

