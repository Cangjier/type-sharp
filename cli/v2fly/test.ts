
let lst = [1, 2, 3, 4, 5, 6, 7];
for (let item of lst) {
    try {
        console.log(item);
        let a = 1/0;
    }
    catch {

    }
}