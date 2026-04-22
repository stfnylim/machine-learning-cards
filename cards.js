// cards.js
// XCS229 Machine Learning flashcards, organized by topic.
// Each card: { q, a, cat } where cat matches a key in CATEGORIES below.

const CATEGORIES = [
  { id: "sl",   label: "Supervised Learning"      },
  { id: "gen",  label: "Generative Learning"       },
  { id: "svm",  label: "Kernels & SVMs"            },
  { id: "dt",   label: "Decision Trees & Ensembles"},
  { id: "un",   label: "Unsupervised Learning"     },
  { id: "dl",   label: "Deep Learning"             },
  { id: "th",   label: "ML Theory"                 },
  { id: "rl",   label: "Reinforcement Learning"    },
];

const CARDS = [

  // ── 1. Supervised Learning ────────────────────────────────────────────────

  { cat: "sl", q: "What is supervised learning?",
    a: "Learning a function h: X → Y from a training set of labeled examples {(x⁽ⁱ⁾, y⁽ⁱ⁾)}. Regression when y ∈ ℝ; classification when y is discrete." },

  { cat: "sl", q: "What is the least-squares cost function for linear regression?",
    a: "J(θ) = ½ Σᵢ (hθ(x⁽ⁱ⁾) − y⁽ⁱ⁾)², the sum of squared errors. Minimized by gradient descent or the normal equations." },

  { cat: "sl", q: "What is the LMS (Widrow-Hoff) update rule?",
    a: "θⱼ := θⱼ + α (y⁽ⁱ⁾ − hθ(x⁽ⁱ⁾)) xⱼ⁽ⁱ⁾. Update magnitude is proportional to the prediction error." },

  { cat: "sl", q: "What is the difference between batch and stochastic gradient descent?",
    a: "Batch GD scans the entire training set before each parameter update. SGD updates after each single example — faster progress on large datasets but noisier." },

  { cat: "sl", q: "What are the normal equations for linear regression?",
    a: "θ = (XᵀX)⁻¹ Xᵀy. A closed-form solution that minimizes J(θ) exactly, without iterating." },

  { cat: "sl", q: "What probabilistic assumption justifies least-squares regression?",
    a: "Assume y⁽ⁱ⁾ = θᵀx⁽ⁱ⁾ + ε⁽ⁱ⁾ with ε⁽ⁱ⁾ ~ N(0, σ²). Maximum likelihood estimation of θ then yields the least-squares cost function." },

  { cat: "sl", q: "What is locally weighted regression (LWR)?",
    a: "A non-parametric method that fits a separate linear model for each query point x, weighting training examples by w⁽ⁱ⁾ = exp(−(x⁽ⁱ⁾ − x)² / 2τ²). Bandwidth τ controls locality. Key cost: the entire training set must be stored and a new optimization solved at every prediction — O(n) memory and O(nd) compute per query." },

  { cat: "sl", q: "What is the sigmoid (logistic) function and its derivative?",
    a: "g(z) = 1 / (1 + e⁻ᶻ). Derivative: g′(z) = g(z)(1 − g(z)). Maps any real number to (0, 1)." },

  { cat: "sl", q: "What is the logistic regression hypothesis?",
    a: "hθ(x) = g(θᵀx) = 1 / (1 + e^(−θᵀx)). Outputs the probability P(y=1 | x; θ) for binary classification." },

  { cat: "sl", q: "What is the classification margin and why does it matter?",
    a: "Margin = y · xᵀθ. Positive → correct prediction; larger value = higher confidence. Loss functions (logistic, hinge, exponential) all penalize negative margins and reward positive ones." },

  { cat: "sl", q: "What are three common loss functions for binary classification?",
    a: "Logistic: log(1 + e⁻ᶻ)  |  Hinge: max{1 − z, 0}  |  Exponential: e⁻ᶻ. All are convex surrogates for 0/1 loss." },

  { cat: "sl", q: "What is Newton's method for MLE, and why is it faster than gradient descent?",
    a: "θ := θ − H⁻¹ ∇θ ℓ(θ), using the Hessian H. Converges quadratically (doubles correct digits per step) vs. linear convergence for GD. Called Fisher scoring for logistic regression." },

  { cat: "sl", q: "What is the perceptron update rule?",
    a: "When sign(θᵀx) ≠ y: θ := θ + yx. Only fires on misclassification; uses threshold activation g(z) = +1 if z ≥ 0, −1 if z < 0." },

  { cat: "sl", q: "What does the Perceptron Convergence Theorem guarantee?",
    a: "If data are linearly separable with margin γ (via unit vector u) and max example norm D, the number of mistakes is at most (D/γ)². The perceptron will converge in finite steps." },

  { cat: "sl", q: "What is the exponential family form of a distribution?",
    a: "p(y; η) = b(y) exp(ηᵀT(y) − a(η)), where η is the natural parameter, T(y) the sufficient statistic, and a(η) the log-partition function." },

  { cat: "sl", q: "What are the three assumptions defining a Generalized Linear Model (GLM)?",
    a: "(1) y | x; θ follows an exponential family distribution. (2) The hypothesis is h(x) = E[T(y) | x]. (3) The natural parameter η = θᵀx." },

  { cat: "sl", q: "What is softmax regression and when is it used?",
    a: "Multiclass generalization of logistic regression. Output probabilities: φᵢ = e^(ηᵢ) / Σⱼ e^(ηⱼ). Arises from the multinomial distribution in the GLM framework." },

  // ── 2. Generative Learning ────────────────────────────────────────────────

  { cat: "gen", q: "What is the difference between discriminative and generative algorithms?",
    a: "Discriminative: model p(y | x) directly. Generative: model p(x | y) and p(y), then use Bayes' rule to compute p(y | x) = p(x | y)p(y) / p(x)." },

  { cat: "gen", q: "What is Gaussian Discriminant Analysis (GDA)?",
    a: "Models p(x | y=k) as a multivariate Gaussian with class-specific mean μₖ but shared covariance Σ. MLE yields a linear decision boundary; the posterior p(y | x) takes the logistic form." },

  { cat: "gen", q: "Write the multivariate Gaussian density.",
    a: "p(x; μ, Σ) = 1 / ((2π)^(d/2)|Σ|^(1/2)) · exp(−½(x − μ)ᵀΣ⁻¹(x − μ))" },

  { cat: "gen", q: "When should you prefer GDA over logistic regression?",
    a: "GDA is more efficient when Gaussian class-conditional assumptions are correct. Logistic regression is more robust when they're wrong (it makes fewer assumptions). Both fit the same linear decision boundary." },

  { cat: "gen", q: "What is the Naive Bayes assumption?",
    a: "Features xᵢ are conditionally independent given the class y: p(x | y) = Πᵢ p(xᵢ | y). Reduces parameters from exponential (2^d) to linear (d), making high-dimensional problems tractable." },

  { cat: "gen", q: "What is Laplace smoothing and what problem does it solve?",
    a: "Replaces MLE φⱼ = count(j)/n with φⱼ = (1 + count(j)) / (k + n). Prevents zero probabilities for unseen feature values, which would cause predictions to collapse in Naive Bayes." },

  { cat: "gen", q: "What are event models in Naive Bayes for text?",
    a: "Multivariate Bernoulli: one feature per word, indicating presence/absence. Multinomial: one feature per word position, modeling word frequencies. Multinomial is more commonly used for text classification." },

  // ── 3. Kernels & SVMs ──────────────────────────────────────────────────────

  { cat: "svm", q: "What is a feature map and how does it relate to a kernel?",
    a: "φ(x) maps inputs to a higher-dimensional feature space. The corresponding kernel is K(x, z) = φ(x)ᵀφ(z). We can compute K efficiently without ever computing φ explicitly." },

  { cat: "svm", q: "What is the kernel trick?",
    a: "Replace every inner product ⟨x, z⟩ in an algorithm with K(x, z). This lets algorithms operate in high (or infinite) dimensional feature spaces at the cost of only computing kernel evaluations." },

  { cat: "svm", q: "What is the difference between functional and geometric margin?",
    a: "Functional: γ̂⁽ⁱ⁾ = y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b). Geometric: γ⁽ⁱ⁾ = y⁽ⁱ⁾((w/||w||)ᵀx⁽ⁱ⁾ + b/||w||). Functional margin is scale-dependent; geometric margin is the true Euclidean distance to the decision boundary." },

  { cat: "svm", q: "What is the SVM primal optimization problem?",
    a: "min_{w,b} ½||w||² subject to y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) ≥ 1 for all i. Maximizing the geometric margin is equivalent to minimizing ||w||² with functional margin constraints set to 1." },

  { cat: "svm", q: "What is Lagrange duality and why does it matter for SVMs?",
    a: "Converts a constrained primal problem into a dual by introducing Lagrange multipliers α. For convex problems with Slater's condition, p* = d* (strong duality). The SVM dual is expressed in terms of kernel evaluations — enabling the kernel trick." },

  { cat: "svm", q: "What is the KKT complementarity condition and its implication for SVMs?",
    a: "αᵢ > 0 ⟹ y⁽ⁱ⁾(wᵀx⁽ⁱ⁾ + b) = 1. Most αᵢ = 0; only support vectors (on the margin boundary) have αᵢ > 0. Predictions depend only on these few support vectors." },

  { cat: "svm", q: "What is the SVM dual problem and how does C change it in the soft-margin case?",
    a: "Hard margin: max_α Σᵢ αᵢ − ½ Σᵢ,ⱼ y⁽ⁱ⁾y⁽ʲ⁾αᵢαⱼ⟨x⁽ⁱ⁾,x⁽ʲ⁾⟩ s.t. αᵢ ≥ 0. Soft margin: identical objective but αᵢ ∈ [0, C] — the upper bound C limits how much any single example can influence w, preventing outliers from dominating. Replace inner products with K(·,·) to kernelize either form." },

  { cat: "svm", q: "What is the Gaussian (RBF) kernel?",
    a: "K(x, z) = exp(−||x − z||² / 2τ²). Corresponds to an infinite-dimensional feature space. Bandwidth τ: small → very local decision boundary; large → nearly linear." },

  { cat: "svm", q: "What is the representer theorem?",
    a: "Any minimizer of J_λ(θ) = (1/m)Σ L(θᵀx⁽ⁱ⁾, y⁽ⁱ⁾) + (λ/2)||θ||² can be written as θ = Σᵢ αᵢx⁽ⁱ⁾. This justifies optimizing over α in kernel methods instead of high-dimensional θ." },

  { cat: "svm", q: "What is the hinge loss?",
    a: "L(z, y) = max{0, 1 − yz}. Zero when the prediction has margin ≥ 1; increases linearly otherwise. Encourages both correctness and a confident margin, giving SVMs robustness." },

  { cat: "svm", q: "What is the SMO algorithm?",
    a: "Sequential Minimal Optimization solves the SVM dual by iteratively picking two multipliers αᵢ, αⱼ, optimizing them jointly (a constrained 1D quadratic), and repeating. Efficient because the two-variable sub-problem has an analytic solution." },

  // ── 4. Decision Trees & Ensembles ─────────────────────────────────────────

  { cat: "dt", q: "Why are decision trees non-linear?",
    a: "They partition input space recursively — each leaf produces a prediction for a region, not a global linear function. No feature map φ(x) is needed to achieve non-linearity." },

  { cat: "dt", q: "What split criterion is used for classification trees, and why not misclassification error?",
    a: "Cross-entropy: L = −Σc p̂c log₂ p̂c. It is strictly concave, guaranteeing that any pure split reduces parent loss. Misclassification error is not strictly concave, allowing splits that don't improve it." },

  { cat: "dt", q: "What split criterion is used for regression trees?",
    a: "Squared loss: L(R) = (1/|R|) Σᵢ∈R (yᵢ − ȳ)², where ȳ is the mean of values in region R. Each leaf predicts the mean of its training targets." },

  { cat: "dt", q: "What are decision stumps and why are they ideal for boosting?",
    a: "Single-split trees (depth-1). High bias, very low variance — weak learners. Boosting combines many stumps additively, progressively reducing bias while keeping variance low." },

  { cat: "dt", q: "What is the ensemble variance formula, and what does it imply?",
    a: "Var(X̄) = ρσ² + ((1−ρ)/n)σ². Increasing n (more models) or decreasing ρ (less correlated models) both reduce ensemble variance. Bagging targets ρ; more data targets σ²." },

  { cat: "dt", q: "What is bagging (Bootstrap Aggregation)?",
    a: "Train each model on a different bootstrap sample (sample n examples with replacement). Reduces correlation ρ between models, lowering ensemble variance. Predictions are averaged (regression) or majority-voted (classification)." },

  { cat: "dt", q: "What is out-of-bag (OOB) error?",
    a: "Each bootstrap sample uses ~63% of data. The remaining ~37% can validate that model for free — no separate validation set needed. OOB error approximates leave-one-out cross-validation in the limit." },

  { cat: "dt", q: "What is the key difference between bagging and boosting?",
    a: "Bagging: variance reduction — models trained in parallel on different data subsets. Boosting: bias reduction — models trained sequentially, reweighting examples to focus on previously misclassified ones." },

  { cat: "dt", q: "How does AdaBoost weight examples and learners?",
    a: "Start with uniform weights. After round m: up-weight misclassified examples. Learner weight: αₘ = log((1 − errₘ) / errₘ). Final prediction: sign(Σₘ αₘGₘ(x))." },

  { cat: "dt", q: "What is Forward Stagewise Additive Modeling (FSAM)?",
    a: "At each step m, find βₘ, γₘ to minimize Σᵢ L(yᵢ, fₘ₋₁(xᵢ) + β G(xᵢ; γ)), then set fₘ = fₘ₋₁ + βₘG(·; γₘ). AdaBoost is FSAM with exponential loss." },

  { cat: "dt", q: "How does gradient boosting work?",
    a: "Compute pseudo-residuals gᵢ = −∂L(yᵢ, f(xᵢ))/∂f(xᵢ), then fit a regression tree to these gradients as the weak learner. Avoids the hard combinatorial search in FSAM." },

  // ── 5. Unsupervised Learning ───────────────────────────────────────────────

  { cat: "un", q: "What are the two steps of the k-means algorithm?",
    a: "Assignment: c⁽ⁱ⁾ := argmin_j ||x⁽ⁱ⁾ − μⱼ||². Update: μⱼ := mean of all x⁽ⁱ⁾ with c⁽ⁱ⁾ = j. Monotonically decreases distortion J = Σᵢ ||x⁽ⁱ⁾ − μ_{c⁽ⁱ⁾}||²." },

  { cat: "un", q: "What is the distortion function J in k-means and what does convergence mean?",
    a: "J(c, μ) = Σᵢ ||x⁽ⁱ⁾ − μ_{c⁽ⁱ⁾}||². Both steps decrease J, so the algorithm converges — but to a local, not global, minimum. Run multiple random restarts to mitigate this." },

  { cat: "un", q: "What is the Mixture of Gaussians model?",
    a: "x⁽ⁱ⁾ ~ Σⱼ φⱼ N(μⱼ, Σⱼ), where latent z⁽ⁱ⁾ ∈ {1..k} indicates the component. Soft k-means: instead of hard assignments, compute posterior probabilities wⱼ⁽ⁱ⁾ = p(z⁽ⁱ⁾=j | x⁽ⁱ⁾)." },

  { cat: "un", q: "What are latent variables and why do they complicate MLE?",
    a: "Latent (hidden) variables z are unobserved. Marginalizing them out gives ℓ(θ) = Σᵢ log Σⱼ p(x⁽ⁱ⁾, z⁽ⁱ⁾=j; θ), a non-concave function that cannot be maximized in closed form." },

  { cat: "un", q: "What is Jensen's inequality?",
    a: "For a convex function f: E[f(X)] ≥ f(E[X]). For concave f, inequality reverses: E[f(X)] ≤ f(E[X]). Equality iff X is constant a.s. Fundamental to deriving the EM lower bound." },

  { cat: "un", q: "What is the ELBO and how does it lower-bound the log-likelihood?",
    a: "ELBO(x; Q, θ) = Σz Q(z) log[p(x,z;θ)/Q(z)]. By Jensen's inequality on the concave log function: log p(x;θ) ≥ ELBO. Equality holds when Q(z) = p(z|x;θ)." },

  { cat: "un", q: "What are the E-step and M-step of the EM algorithm?",
    a: "E-step: set Q(z) = p(z | x; θ_old) — compute posterior over latents (tightens the ELBO). M-step: θ_new = argmax_θ ELBO — maximize the lower bound over parameters. Repeat until convergence." },

  { cat: "un", q: "What is the EM algorithm guaranteed to do?",
    a: "Monotonically increase (or maintain) the log-likelihood ℓ(θ) at each iteration. Converges to a stationary point (local maximum or saddle point), not necessarily the global maximum. Run from multiple random initializations to mitigate this." },

  { cat: "un", q: "What problem does Factor Analysis address?",
    a: "When d >> n, the sample covariance is singular. Factor Analysis models x = μ + Λz + ε, where z ∈ ℝᵏ (k << d) are latent factors and ε ~ N(0, Ψ) (diagonal). Captures correlations with far fewer parameters." },

  { cat: "un", q: "What is the loading matrix Λ in Factor Analysis?",
    a: "Λ ∈ ℝ^(d×k) maps the k latent factors z to observed dimensions. Each column of Λ is a 'factor direction'; the outer product ΛΛᵀ models shared variance while Ψ models independent noise per dimension." },

  { cat: "un", q: "What is ICA and when does it work?",
    a: "Independent Component Analysis recovers independent source signals s from mixtures x = As by finding unmixing W = A⁻¹. Works only when sources are non-Gaussian; Gaussian sources have a rotational ambiguity making recovery impossible." },

  { cat: "un", q: "What are the two fundamental ambiguities in ICA?",
    a: "Permutation ambiguity (source order unknown) and scaling ambiguity (magnitudes unknown). For non-Gaussian sources, these are the only ambiguities — the mixing matrix is otherwise identifiable." },

  { cat: "un", q: "What is PCA and what does it compute?",
    a: "Principal Component Analysis finds the orthogonal directions of maximum variance. Projecting onto the top k eigenvectors of the covariance Σ = (1/n)Σᵢ x⁽ⁱ⁾x⁽ⁱ⁾ᵀ minimizes reconstruction error." },

  { cat: "un", q: "Why must data be normalized before PCA?",
    a: "Features on different scales dominate variance. Normalize via xⱼ ← (xⱼ − μⱼ)/σⱼ so each feature contributes equally. Without this, PCA is dominated by the highest-magnitude feature." },

  // ── 6. Deep Learning ──────────────────────────────────────────────────────

  { cat: "dl", q: "Why can't you use only linear activation functions in a neural network?",
    a: "Compositions of linear functions are linear. Without non-linearity, a deep network collapses to a single affine transformation — no more expressive than linear regression." },

  { cat: "dl", q: "What is the ReLU activation function?",
    a: "f(z) = max(0, z). Cheap to compute, avoids vanishing gradients for positive activations, and produces sparse activations. Most common default choice for hidden layers." },

  { cat: "dl", q: "What is backpropagation?",
    a: "Efficient computation of gradients via the chain rule, propagating deltas backward: δ[l] = (W[l+1]ᵀ δ[l+1]) ⊙ g′(z[l]). Weight gradients: ∇W[l]J = δ[l] a[l-1]ᵀ. Complexity is O(cost of forward pass)." },

  { cat: "dl", q: "What is the vanishing gradient problem and how is it addressed?",
    a: "Gradients shrink exponentially through deep layers (e.g., sigmoid saturates), making early layers learn very slowly. Solutions: ReLU activations, residual connections (skip layers), batch normalization, careful initialization." },

  { cat: "dl", q: "What is Xavier / He initialization?",
    a: "Scale initial weights as W ~ N(0, 2/(nᵢₙ + nₒᵤₜ)) (Xavier) or N(0, 2/nᵢₙ) (He, for ReLU). Keeps activation variance roughly constant across layers, preventing vanishing/exploding gradients at initialization." },

  { cat: "dl", q: "What is batch normalization?",
    a: "Normalize each layer's pre-activations to zero mean and unit variance over the mini-batch, then scale/shift: ẑ = (z − μ_B)/σ_B, output = γẑ + β. Stabilizes training, allows higher learning rates, mild regularizer." },

  { cat: "dl", q: "What is dropout?",
    a: "Randomly zero out a fraction p of neurons each training forward pass — prevents co-adaptation, acts as an ensemble of 2ⁿ sub-networks. Two implementations: (1) Standard: scale weights by (1−p) at test time. (2) Inverted dropout (modern standard): divide kept activations by (1−p) during training so test time needs no scaling." },

  { cat: "dl", q: "What is vectorization in neural network implementation?",
    a: "Replace per-example for-loops with matrix operations: Z[l] = W[l] A[l-1] + b[l] for the whole mini-batch at once. Exploits BLAS/GPU parallelism for orders-of-magnitude speedup." },

  // ── 7. ML Theory ──────────────────────────────────────────────────────────

  { cat: "th", q: "What is the bias-variance decomposition of test MSE?",
    a: "E[(y − ŷ)²] = σ² + Bias²(f̂) + Var(f̂). σ² is irreducible noise. Simple models: high bias, low variance (underfitting). Complex models: low bias, high variance (overfitting)." },

  { cat: "th", q: "What is the Hoeffding inequality?",
    a: "P(|φ − φ̂| > γ) ≤ 2 exp(−2γ²n). Bounds how much the empirical mean φ̂ can deviate from the true mean φ. Foundational for showing that training error approximates generalization error." },

  { cat: "th", q: "What is uniform convergence in learning theory?",
    a: "Holds when |ε(h) − ε̂(h)| ≤ γ for ALL h ∈ H simultaneously with high probability. With |H| = k hypotheses: P(∃h s.t. |ε − ε̂| > γ) ≤ 2k exp(−2γ²n)." },

  { cat: "th", q: "What is empirical risk minimization (ERM)?",
    a: "Choose ĥ = argmin_{h∈H} ε̂(h). Combined with uniform convergence, ERM guarantees ε(ĥ) ≤ min_{h∈H} ε(h) + 2γ with high probability — the selected hypothesis generalizes." },

  { cat: "th", q: "What is the VC dimension?",
    a: "The size of the largest set of points H can shatter (realize every possible binary labeling). Measures hypothesis class complexity independent of input distribution. Higher VC dim → more data needed to generalize." },

  { cat: "th", q: "What is k-fold cross-validation?",
    a: "Partition data into k disjoint folds. Train on k−1 folds, validate on the remaining fold. Repeat k times, average test errors. More data-efficient than a single holdout split; standard k = 5 or 10." },

  { cat: "th", q: "What is L2 (ridge) regularization?",
    a: "Add λ/2 ||θ||² to the loss. Shrinks weights toward zero, reduces overfitting. Gradient update: θ := (1 − αλ)θ − α ∇J. Equivalent to a Gaussian prior on θ in MAP estimation." },

  { cat: "th", q: "What is L1 (lasso) regularization and how does it differ from L2?",
    a: "Add λ||θ||₁ to the loss. Produces sparse solutions (many weights exactly zero) — useful for feature selection. L2 shrinks all weights proportionally; L1 drives small weights to zero." },

  { cat: "th", q: "What is error analysis and how does it guide model improvement?",
    a: "Manually inspect misclassified examples to identify systematic error patterns. Quantify the expected improvement from fixing each issue before investing engineering effort. Prioritize the biggest gains." },

  // ── 8. Reinforcement Learning ────────────────────────────────────────────

  { cat: "rl", q: "What is the Markov Decision Process (MDP) framework?",
    a: "Tuple (S, A, P_{sa}, γ, R). Agent takes action a ∈ A in state s ∈ S, transitions via P_{sa}(s′), receives reward R(s), discounts future rewards by γ. Goal: maximize E[Σₜ γᵗ R(sₜ)]." },

  { cat: "rl", q: "What is the Bellman equation for the optimal value function?",
    a: "V*(s) = R(s) + max_a γ Σ_{s′} P_{sa}(s′) V*(s′). The optimal value of a state equals the immediate reward plus the discounted optimal future value. Used in value iteration." },

  { cat: "rl", q: "What is value iteration?",
    a: "Initialize V(s) = 0. Repeatedly apply the Bellman backup: V(s) := R(s) + max_a γ Σ_{s′} P_{sa}(s′) V(s′). Converges to V* for finite MDPs; then extract π*(s) = argmax_a Σ_{s′} P_{sa}(s′) V*(s′)." },

  { cat: "rl", q: "What is policy iteration?",
    a: "Alternate between: (1) Policy evaluation — solve for V^π via the linear system. (2) Policy improvement — π(s) := argmax_a Σ_{s′} P_{sa}(s′) V^π(s′). Converges faster than value iteration in practice." },

  { cat: "rl", q: "What is the LQR problem setup?",
    a: "Linear dynamics: sₜ₊₁ = Asₜ + Baₜ + wₜ (wₜ Gaussian noise). Quadratic cost: Σₜ (sₜᵀUsₜ + aₜᵀWaₜ). The optimal policy is linear: a*ₜ = Lₜsₜ, independent of noise." },

  { cat: "rl", q: "What is the discrete Riccati equation in LQR?",
    a: "Φₜ = Aᵀ(Φₜ₊₁ − Φₜ₊₁B(BᵀΦₜ₊₁B − W)⁻¹BᵀΦₜ₊₁)A − U. Solved backward in time. The optimal gain Lₜ is derived from Φₜ; the optimal control law is a*ₜ = Lₜsₜ." },

  { cat: "rl", q: "What is Differential Dynamic Programming (DDP)?",
    a: "Handles non-linear dynamics by linearizing around a nominal trajectory, solving a sequence of time-local LQR problems, executing the improved policy, and repeating until convergence. Iterative LQR approximation." },

  { cat: "rl", q: "What is the Kalman filter and where does it appear in LQG?",
    a: "Maintains a Gaussian belief state (mean, covariance) over the hidden state. Predict: propagate through dynamics. Update: incorporate noisy observation y via Kalman gain K = ΣCᵀ(CΣCᵀ + Σy)⁻¹. LQG = LQR + Kalman filter." },

  // ── 1+. Supervised Learning — additional ──────────────────────────────────

  { cat: "sl", q: "When should you use gradient descent vs. the normal equations?",
    a: "Normal equations: O(d³) solve, exact, no α to tune — good when d is small (≤ ~10k features). Gradient descent: O(knd) per epoch — better when d is huge or XᵀX is near-singular. GD also generalizes to non-linear models; normal equations are linear-only." },

  { cat: "sl", q: "What is mini-batch gradient descent?",
    a: "Update parameters after each mini-batch of b examples (typically b = 32–512). Middle ground: less noisy than SGD, more frequent updates than batch GD. Enables parallelism on GPU and is the standard in deep learning practice." },

  { cat: "sl", q: "How do you go non-linear without kernels in linear regression?",
    a: "Polynomial feature engineering: add x², x³, x₁x₂, etc. as extra features, then run standard linear regression. Expressiveness grows with degree but so does overfitting risk — pair with regularization." },

  { cat: "sl", q: "What happens when the learning rate α is too large or too small?",
    a: "Too large: overshoots the minimum, cost oscillates or diverges. Too small: converges correctly but extremely slowly. Diagnosis: plot J vs. iteration — diverging J means α too large; flat J means α too small." },

  // ── 3+. Kernels & SVMs — additional ──────────────────────────────────────

  { cat: "svm", q: "What is the soft-margin SVM and what does the C parameter control?",
    a: "Introduces slack variables ξᵢ ≥ 0 to allow margin violations. Primal: min ½||w||² + C Σξᵢ s.t. y⁽ⁱ⁾(wᵀx⁽ⁱ⁾+b) ≥ 1−ξᵢ. Large C: tight margin, low tolerance for errors (may overfit). Small C: wide margin, more violations allowed (may underfit)." },

  { cat: "svm", q: "What is Mercer's condition?",
    a: "A symmetric function K(x, z) is a valid kernel iff the Gram matrix K (Kᵢⱼ = K(x⁽ⁱ⁾, x⁽ʲ⁾)) is positive semi-definite for any set of inputs. Equivalently, K corresponds to an inner product in some feature space." },

  { cat: "svm", q: "What are the kernel composition rules?",
    a: "If K₁, K₂ are valid kernels, so are: K₁+K₂, cK₁ (c>0), K₁·K₂, f(x)K₁(x,z)f(z), exp(K₁), and K(x,z)=φ(x)ᵀφ(z) for any φ. Lets you build complex kernels from simple ones." },

  // ── 4+. Decision Trees & Ensembles — additional ───────────────────────────

  { cat: "dt", q: "What is a random forest and how does it differ from plain bagging?",
    a: "Bagging of decision trees with an extra twist: at each split, only a random subset of features is considered — typically √d for classification, d/3 for regression. De-correlates trees beyond what bootstrap sampling achieves alone, further reducing ensemble variance." },

  { cat: "dt", q: "What is cost-complexity pruning in decision trees?",
    a: "After growing a full tree, iteratively remove the subtree whose removal minimally increases Σ L(Rₘ), weighted by α·(number of leaves removed). Cross-validate over α to find the right bias-variance tradeoff. Prevents overfitting without stopping growth early." },

  // ── 5+. Unsupervised Learning — additional ────────────────────────────────

  { cat: "un", q: "What is k-means++ initialization?",
    a: "Choose the first centroid uniformly at random. Each subsequent centroid is chosen with probability proportional to D(x)², the squared distance to the nearest already-chosen centroid. Spreads initial centroids apart, dramatically reducing bad local minima." },

  { cat: "un", q: "How do you choose k in k-means? What is the elbow method?",
    a: "Plot distortion J vs. k. J decreases as k grows; the 'elbow' — where marginal gain flattens — suggests a good k. Silhouette score is more principled: measures how much closer each point is to its own cluster vs. the next nearest." },

  { cat: "un", q: "What is explained variance ratio and how do you choose PCA components?",
    a: "EVR_k = Σᵢ₌₁ᵏ λᵢ / Σᵢ λᵢ, where λᵢ are eigenvalues sorted descending. Choose k where cumulative EVR reaches a threshold (e.g., 95%). Alternatively, plot a scree plot and look for the elbow." },

  { cat: "un", q: "What is PCA whitening?",
    a: "After projecting onto k principal components, divide each dimension by the square root of its eigenvalue: z = Λ⁻¹/² Uᵀx. Produces decorrelated features with unit variance — useful preprocessing before algorithms sensitive to feature scale." },

  // ── 6+. Deep Learning — additional ───────────────────────────────────────

  { cat: "dl", q: "What is the momentum optimizer?",
    a: "Accumulates a velocity vector v in the gradient direction: v := βv + ∇J, θ := θ − αv. Typical β = 0.9. Accelerates through consistent gradient directions, dampens oscillation in high-curvature directions. Faster convergence than vanilla SGD." },

  { cat: "dl", q: "What is RMSProp?",
    a: "Maintains a per-parameter running average of squared gradients: s := βs + (1−β)g², then θ := θ − α·g/√(s+ε). Adapts the learning rate per parameter — large gradients get smaller steps. Effective for non-stationary and RNN training." },

  { cat: "dl", q: "What is the Adam optimizer?",
    a: "Combines momentum (first moment m) and RMSProp (second moment v): m := β₁m + (1−β₁)g, v := β₂v + (1−β₂)g². Bias-corrected: m̂ = m/(1−β₁ᵗ), v̂ = v/(1−β₂ᵗ). Update: θ := θ − α·m̂/√(v̂+ε). Default: β₁=0.9, β₂=0.999, ε=10⁻⁸." },

  { cat: "dl", q: "What is the universal approximation theorem?",
    a: "A feedforward network with a single hidden layer containing enough neurons and a non-polynomial activation function can approximate any continuous function on a compact domain to arbitrary precision. Guarantees expressiveness but says nothing about learnability or efficiency." },

  { cat: "dl", q: "What is early stopping?",
    a: "Train while monitoring validation loss. Stop when validation loss stops improving (or starts increasing) even though training loss continues to fall. Cheap, effective regularizer — acts like L2 regularization by limiting the number of gradient steps." },

  { cat: "dl", q: "What is the combined gradient of softmax + cross-entropy loss?",
    a: "∂L/∂zᵢ = ŷᵢ − yᵢ, where ŷ = softmax(z) and y is the one-hot label. The gradient is simply the prediction error — the softmax and log in the cross-entropy cancel out cleanly, making backprop through the output layer efficient." },

  { cat: "dl", q: "What are common learning rate schedules?",
    a: "Step decay: multiply α by γ every k epochs. Cosine annealing: α decreases following a cosine curve to near zero. Warm-up: start with a small α, ramp up for the first few epochs, then decay. Prevents instability early in training when gradients are noisy." },

  // ── 7+. ML Theory — additional ───────────────────────────────────────────

  { cat: "th", q: "What is PAC learning?",
    a: "Probably Approximately Correct learning: an algorithm PAC-learns H if for any ε, δ > 0, it returns h with ε(h) ≤ min ε(h*) + ε with probability ≥ 1−δ, using poly(1/ε, 1/δ, d) examples. Formalizes when a problem is efficiently learnable." },

  { cat: "th", q: "What is the union bound and how is it used?",
    a: "P(A₁ ∪ A₂ ∪ … ∪ Aₖ) ≤ Σ P(Aᵢ). In learning theory: the probability that any hypothesis in H has |ε − ε̂| > γ is ≤ Σᵢ P(|εᵢ − ε̂ᵢ| > γ) ≤ 2|H| exp(−2γ²n). Enables uniform convergence over a finite class." },

  { cat: "th", q: "What is sample complexity?",
    a: "The number of training examples n needed to guarantee ε(ĥ) ≤ ε* + ε with probability ≥ 1−δ. For finite H: n ≥ (1/2ε²) log(2|H|/δ). For infinite H: n grows with VC dim d as O(d/ε² · log(1/δ)). Tells you how much data you need." },

  { cat: "th", q: "What is the correct role of train, validation, and test sets?",
    a: "Train: fit model parameters. Validation (dev): tune hyperparameters and select models. Test: final unbiased evaluation — used exactly once. Using the test set for model selection causes optimistic bias; the reported error no longer reflects true generalization." },

  { cat: "th", q: "What is MAP estimation and how does it relate to regularization?",
    a: "Maximum A Posteriori: θ_MAP = argmax_θ p(θ|data) = argmax_θ [log p(data|θ) + log p(θ)]. A Gaussian prior N(0, 1/λ I) on θ adds −λ/2 ||θ||² to the log-likelihood — exactly L2 regularization. L1 regularization corresponds to a Laplace prior." },

  { cat: "th", q: "Why does convexity matter in optimization?",
    a: "A convex loss has no local minima — every local minimum is a global minimum. Guarantees that gradient descent converges to the optimal solution regardless of initialization. Logistic regression and SVMs are convex; neural networks are not." },

  { cat: "th", q: "What is the curse of dimensionality?",
    a: "In high dimensions (large d), data becomes exponentially sparse. Distances concentrate — all points become roughly equidistant. Volume of a hypersphere shrinks relative to its bounding cube. Impacts k-NN, kernels, and density estimation; motivates dimensionality reduction." },

  { cat: "th", q: "What is a good data preprocessing checklist before training?",
    a: "1. Mean-center each feature (subtract μ). 2. Normalize variance (divide by σ). 3. Check for and handle missing values. 4. Remove or cap outliers. 5. Shuffle before splitting. 6. Apply the same transform (fit on train only) to val/test — never fit on test data." },

  // ── 8+. Reinforcement Learning — additional ───────────────────────────────

  { cat: "rl", q: "What is Q-learning?",
    a: "Model-free, off-policy TD control. Maintains Q(s,a) ≈ Q*(s,a). Update: Q(s,a) := Q(s,a) + α[r + γ max_{a′} Q(s′,a′) − Q(s,a)]. Converges to Q* for finite MDPs with sufficient exploration. Policy: π(s) = argmax_a Q(s,a)." },

  { cat: "rl", q: "What is the policy gradient theorem (REINFORCE)?",
    a: "∇_θ E[R] = E[∇_θ log π_θ(a|s) · R]. Estimate by sampling trajectories and updating θ := θ + α ∇_θ log π_θ(aₜ|sₜ) · Gₜ where Gₜ is the return from time t. Directly optimizes the policy without a value function." },

  { cat: "rl", q: "What is the difference between model-based and model-free RL?",
    a: "Model-based: learns/uses a model of P_{sa} and R, then plans (value/policy iteration). More sample-efficient but errors in the model propagate. Model-free (Q-learning, policy gradients): learns directly from experience, no explicit model. More robust but requires more data." },

  { cat: "rl", q: "What is the exploration-exploitation tradeoff?",
    a: "Exploitation: take the action with highest current Q estimate. Exploration: try other actions to discover better strategies. ε-greedy: take random action with prob ε, greedy otherwise. UCB: add exploration bonus √(log t / N(a)). Without exploration, the agent may get stuck in suboptimal policies." },

  { cat: "rl", q: "What is fitted value iteration for continuous state spaces?",
    a: "Approximate V*(s) with a function approximator (e.g., neural net). Iteratively: (1) sample states {s⁽ⁱ⁾}, (2) compute targets yᵢ = R(s⁽ⁱ⁾) + γ max_a Σ_{s′} P_{sa}(s′) V(s′), (3) regress V on {(s⁽ⁱ⁾, yᵢ)}. Extends value iteration to continuous/large state spaces." },

  // ── Fixes & additions ─────────────────────────────────────────────────────

  // ML Theory — foundational concepts

  { cat: "th", q: "What is Maximum Likelihood Estimation (MLE)?",
    a: "Choose parameters θ that maximize the probability of the observed data: θ_MLE = argmax_θ ∏ᵢ p(x⁽ⁱ⁾; θ). In practice, maximize the log-likelihood ℓ(θ) = Σᵢ log p(x⁽ⁱ⁾; θ) — log converts products to sums and is monotone, so the maximizer is the same." },

  { cat: "th", q: "What is KL divergence and what are its key properties?",
    a: "KL(P‖Q) = Σₓ P(x) log(P(x)/Q(x)). Measures how much P diverges from Q. Properties: (1) KL ≥ 0 always. (2) KL = 0 iff P = Q. (3) Not symmetric: KL(P‖Q) ≠ KL(Q‖P). Appears in EM (ELBO = log p(x) − KL(Q‖p(z|x))), VAEs, and information theory." },

  { cat: "th", q: "What is the difference between parametric and non-parametric algorithms?",
    a: "Parametric: fixed number of parameters regardless of training set size (linear regression, logistic regression, neural nets). Non-parametric: model complexity grows with data (k-NN, LWR, kernel SVMs, GPs). Non-parametric methods are more flexible but slower at inference and need more memory." },

  // Deep Learning — missing concepts

  { cat: "dl", q: "How do sigmoid, tanh, and ReLU compare as activation functions?",
    a: "Sigmoid: output ∈ (0,1), saturates at extremes → vanishing gradients, not zero-centered. Tanh: output ∈ (−1,1), zero-centered but still saturates. ReLU: f(z)=max(0,z), no saturation for z>0, fast to compute, sparse activations — but 'dead ReLU' problem when z always ≤ 0. ReLU is the standard default; tanh common in RNNs." },

  { cat: "dl", q: "What are residual connections (skip connections) and why do they help?",
    a: "Add the input of a block directly to its output: y = F(x) + x. The network learns a residual F(x) = y − x instead of y directly. Benefits: (1) Gradient highway — gradients flow directly through the skip path, alleviating vanishing gradients. (2) Identity is easy to learn (set F≈0). Enables training of very deep networks (ResNet, 100+ layers)." },

  { cat: "dl", q: "What is gradient clipping and when is it used?",
    a: "Cap the gradient norm before applying an update: if ||g|| > threshold, rescale g := g · threshold/||g||. Prevents exploding gradients, which are common in RNNs and deep nets with certain architectures. Complementary to careful initialization — initialization prevents explosion at the start; clipping handles it during training." },

  // Reinforcement Learning — foundational

  { cat: "rl", q: "What is the Markov property and why does it matter for MDPs?",
    a: "The future is independent of the past given the present state: P(sₜ₊₁ | sₜ, aₜ, sₜ₋₁, …) = P(sₜ₊₁ | sₜ, aₜ). This makes the state a sufficient statistic for future rewards. Without the Markov property, value functions and Bellman equations would not be well-defined." },

  { cat: "rl", q: "Why do we discount future rewards with γ < 1?",
    a: "Three reasons: (1) Mathematical — geometric series Σ γᵗ R converges for γ < 1, ensuring finite total reward. (2) Modeling — rewards sooner are preferable to the same reward later (time value). (3) Practical — discounting prevents the agent from deferring reward indefinitely. γ ≈ 0.9–0.99 in practice; γ = 1 only when episodes are guaranteed to terminate." },

  { cat: "rl", q: "What is temporal difference (TD) learning?",
    a: "Update V(s) using a one-step bootstrap target rather than waiting for the full episode return: V(s) := V(s) + α[r + γV(s′) − V(s)]. The TD error δ = r + γV(s′) − V(s) is the prediction error. TD(0) is the simplest case; Q-learning and SARSA are TD methods for Q functions. Bridges Monte Carlo (full returns) and dynamic programming (bootstrapping)." },

  // Decision Trees — missing split criterion

  { cat: "dt", q: "What is Gini impurity and how does it compare to cross-entropy?",
    a: "Gini(R) = 1 − Σc p̂c². Measures the probability of mislabeling a randomly chosen example. Like cross-entropy it is concave, so any pure split reduces it. Cross-entropy penalizes confident wrong predictions more heavily (log scale); Gini is computationally cheaper (no log). Both produce similar trees in practice." },

];
